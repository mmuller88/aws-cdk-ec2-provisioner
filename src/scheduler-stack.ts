import * as ddb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as core from '@aws-cdk/core';
import * as ddbStream from '@aws-solutions-constructs/aws-dynamodb-stream-lambda';
import { CustomStack } from 'aws-cdk-staging-pipeline/lib/custom-stack';


export interface SchedulerStackProps extends core.StackProps {
  readonly stage: string;
  readonly configTableName: string;
}

export class SchedulerStack extends CustomStack {
  constructor(scope: core.Construct, id: string, props: SchedulerStackProps) {
    super(scope, id, props);

    const table = ddb.Table.fromTableName(this, 'configTable', props.configTableName);

    const cfnTable = table.node.defaultChild as ddb.CfnTable;
    cfnTable.streamSpecification = {
      streamViewType: ddb.StreamViewType.NEW_IMAGE,
    };
    const streamArn = cfnTable.attrStreamArn;

    const myLambda = new lambda.Function(this, 'my-lambda', {
      code: new lambda.InlineCode(`
      exports.handler = (event, context, callback) => {
        console.log('event',event)
        callback(null,'10')
      }
        `),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_10_X,
    });

    const eventSoruce = myLambda.addEventSourceMapping('test', {
      eventSourceArn: streamArn,
      batchSize: 5,
      startingPosition: lambda.StartingPosition.TRIM_HORIZON,
      bisectBatchOnError: true,
      retryAttempts: 10,
    });
    const roleUpdates = myLambda.addToRolePolicy(
      new iam.PolicyStatement({
        actions: [
          'dynamodb:DescribeStream',
          'dynamodb:GetRecords',
          'dynamodb:GetShardIterator',
          'dynamodb:ListStreams',
        ],
        resources: [streamArn],
      }),
    );


    // this.cfnOutputs = { ...appsync.cfnOutputs, ...staticsite.cfnOutputs };

  }
}
