import * as ec2 from '@aws-cdk/aws-ec2';
// import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';
import { CustomStack } from 'aws-cdk-staging-pipeline/lib/custom-stack';
// import * as statement from 'cdk-iam-floyd';

export interface Ec2StackProps extends cdk.StackProps {
  readonly stage: string;
}
export class Ec2Stack extends CustomStack {
  constructor(scope: cdk.Construct, id: string, props: Ec2StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, 'VPC', {
      isDefault: true,
    });

    new ec2.Instance(this, 'instance', {
      instanceType: new ec2.InstanceType('t2.micro'),
      vpc,
      keyName: 'ec2dev',
      machineImage: ec2.MachineImage.latestAmazonLinux({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
    });
  }
}
