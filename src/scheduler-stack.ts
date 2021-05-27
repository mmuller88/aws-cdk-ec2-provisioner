import * as path from 'path';
// import * as ddb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
// import * as lambdajs from '@aws-cdk/aws-lambda-nodejs';
import * as logs from '@aws-cdk/aws-logs';
import * as core from '@aws-cdk/core';
import { CustomStack } from 'aws-cdk-staging-pipeline/lib/custom-stack';
import { AppSyncTransformer } from 'cdk-appsync-transformer';
import * as statement from 'cdk-iam-floyd';


export interface SchedulerStackProps extends core.StackProps {
  readonly stage: string;
  readonly appSyncTransformer: AppSyncTransformer;
}

export class SchedulerStack extends CustomStack {
  constructor(scope: core.Construct, id: string, props: SchedulerStackProps) {
    super(scope, id, props);

    // const streamArn = props.appSyncTransformer.addDynamoDBStream({
    //   modelTypeName: 'Ec2Config',
    //   streamViewType: ddb.StreamViewType.NEW_IMAGE,
    // });

    const dockerfile = path.join(__dirname, '..');

    const cdkSchedulerLambda = new lambda.DockerImageFunction(this, 'scheduler', {
      code: lambda.DockerImageCode.fromImageAsset(dockerfile),
      logRetention: logs.RetentionDays.ONE_DAY,
      environment: {},
      timeout: core.Duration.minutes(15),
    });

    // cdkSchedulerLambda.addEventSourceMapping('test', {
    //   eventSourceArn: streamArn,
    //   batchSize: 5,
    //   startingPosition: lambda.StartingPosition.TRIM_HORIZON,
    //   bisectBatchOnError: true,
    //   retryAttempts: 10,
    // });

    cdkSchedulerLambda.addToRolePolicy(
      new statement.Dynamodb().allow().toDescribeStream().toGetRecords().toGetShardIterator().toListStreams(),
    );

    cdkSchedulerLambda.addToRolePolicy(
      new statement.Cloudformation().allow().toDescribeStacks().toCreateStack().toCreateChangeSet().toExecuteChangeSet().toDescribeChangeSet()
        .toGetTemplate().toDeleteChangeSet(),
    );
    cdkSchedulerLambda.addToRolePolicy(
      new statement.Ssm().allow().toGetParameter(),
    );
    cdkSchedulerLambda.addToRolePolicy(
      new statement.S3().allow().toGetBucketLocation().toListBucket().toGetObject().toPutObject().toDeleteObject(),
    );
    cdkSchedulerLambda.addToRolePolicy(
      new statement.Iam().allow().toPassRole(),
    );
  }
}