import * as path from 'path';
import * as ddb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdajs from '@aws-cdk/aws-lambda-nodejs';
import * as logs from '@aws-cdk/aws-logs';
import * as core from '@aws-cdk/core';
import { CustomStack } from 'aws-cdk-staging-pipeline/lib/custom-stack';
import { AppSyncTransformer } from 'cdk-appsync-transformer';
import * as statement from 'cdk-iam-floyd';


export interface SchedulerStackProps extends core.StackProps {
  readonly stage: string;
  readonly appSyncTransformer?: AppSyncTransformer;
}

export class SchedulerStack extends CustomStack {
  constructor(scope: core.Construct, id: string, props: SchedulerStackProps) {
    super(scope, id, props);
    // const dockerfile = path.join(__dirname, '..');

    // const cdkSchedulerLambda = new lambda.DockerImageFunction(this, 'scheduler', {
    const cdkSchedulerLambda = new lambdajs.NodejsFunction(this, 'scheduler', {
      entry: `${path.join(__dirname)}/lambda/scheduler.ts`,
      bundling: {
        commandHooks: {
          afterBundling(inputDir: string, outputDir: string): string[] {
            return [`cp ${inputDir}/cfn/ec2-vm-stack.template.json ${outputDir} 2>/dev/null`];
          },
          beforeInstall(_inputDir: string, _outputDir: string): string[] {
            return [];
          },
          beforeBundling(_inputDir: string, _outputDir: string): string[] {
            return [];
          },
        },
      },
      // code: lambda.DockerImageCode.fromImageAsset(dockerfile),
      logRetention: logs.RetentionDays.ONE_DAY,
      environment: {},
      timeout: core.Duration.minutes(15),
    });

    if (props.appSyncTransformer) {
      const streamArn = props.appSyncTransformer.addDynamoDBStream({
        modelTypeName: 'Ec2Config',
        streamViewType: ddb.StreamViewType.NEW_AND_OLD_IMAGES,
      });

      cdkSchedulerLambda.addEventSourceMapping('test', {
        eventSourceArn: streamArn,
        batchSize: 1,
        startingPosition: lambda.StartingPosition.TRIM_HORIZON,
        bisectBatchOnError: true,
        retryAttempts: 10,
      });
    }

    cdkSchedulerLambda.addToRolePolicy(
      new statement.Dynamodb().allow().toDescribeStream().toGetRecords().toGetShardIterator().toListStreams(),
    );
    cdkSchedulerLambda.addToRolePolicy(
      new statement.Cloudformation().allow().toDescribeStacks().toCreateStack().toCreateChangeSet().toExecuteChangeSet().toDescribeChangeSet()
        .toGetTemplate().toDeleteChangeSet().toDescribeStackEvents().toUpdateStack().toDeleteStack(),
    );
    cdkSchedulerLambda.addToRolePolicy(
      new statement.Ssm().allow().toGetParameter().toGetParameters(),
    );
    cdkSchedulerLambda.addToRolePolicy(
      new statement.S3().allow().toGetBucketLocation().toListBucket().toGetObject().toPutObject().toDeleteObject(),
    );
    cdkSchedulerLambda.addToRolePolicy(
      new statement.Iam().allow().toPassRole().toCreateRole().toCreateInstanceProfile().toPutRolePolicy().toAddRoleToInstanceProfile()
        .toDeleteRolePolicy().toRemoveRoleFromInstanceProfile().toDeleteInstanceProfile(),
    );
    cdkSchedulerLambda.addToRolePolicy(
      new statement.Ec2().allow().toDescribeImages().toCreateSecurityGroup().toDescribeSecurityGroups().toRevokeSecurityGroupEgress().toCreateTags()
        .toAuthorizeSecurityGroupEgress().toRunInstances().toDescribeInstances().toTerminateInstances().toDeleteSecurityGroup(),
    );
  }
}