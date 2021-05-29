import * as ec2 from '@aws-cdk/aws-ec2';
// import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';
import { CustomStack } from 'aws-cdk-staging-pipeline/lib/custom-stack';
import * as statement from 'cdk-iam-floyd';

export interface Ec2StackProps extends cdk.StackProps {
  readonly stage: string;
  readonly userId: string;
  readonly vmType: number;
}
export class Ec2Stack extends CustomStack {
  constructor(scope: cdk.Construct, id: string, props: Ec2StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, 'VPC', {
      isDefault: true,
    });

    const userData = ec2.UserData.forLinux();
    userData.addCommands(`
# Retrieve token for accessing EC2 instance metadata (https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-data-retrieval.html)
TOKEN=$(curl -SsfX PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
# Retrieve the instance Id of the current EC2 instance
INSTANCE_ID=$(curl -SsfH "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/instance-id)

aws --region ${this.region} ec2 stop-instances --instance-ids $INSTANCE_ID
    `);

    const userIdParam = new cdk.CfnParameter(this, 'userIdParam', {
      default: 'noUserId',
    });

    const vmTypeParam = new cdk.CfnParameter(this, 'vmTypeParam', {
      default: '-1',
    });


    const instance = new ec2.Instance(this, 'instance', {
      instanceName: `vm-${userIdParam.value.toString() ?? 'noUserId'}-${vmTypeParam.value.toString() ?? '-1'}`,
      instanceType: new ec2.InstanceType('t2.micro'),
      vpc,
      keyName: 'ec2dev',
      machineImage: ec2.MachineImage.latestAmazonLinux({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      userData,
    });


    cdk.Tags.of(instance).add('Owner', 'Hacklab');
    cdk.Tags.of(instance).add('UserId', userIdParam.value.toString());
    cdk.Tags.of(instance).add('VmType', vmTypeParam.value.toString());

    instance.addToRolePolicy(new statement.Ec2().allow().toDescribeVolumes().toDetachVolume()
      .toAttachVolume().toCreateTags().toDescribeTags().toTerminateInstances().toDeleteSecurityGroup().toDescribeInstances().toStopInstances());

  }
}
