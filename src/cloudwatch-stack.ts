import * as path from 'path';
import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdajs from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import { CustomStack } from 'aws-cdk-staging-pipeline/lib/custom-stack';

export interface CloudWatchStackProps extends cdk.StackProps {
  readonly stage: string;
}

export class CloudWatchStack extends CustomStack {
  constructor(scope: cdk.Construct, id: string, props: CloudWatchStackProps) {
    super(scope, id, props);


    const cdkSchedulerLambda = lambda.Function.fromFunctionArn(this, 'cdkSchedulerLambda', `arn:aws:lambda:${this.region}:${this.account}:function:scheduler`);
    // 👇 define a metric for lambda errors
    const functionErrors = cdkSchedulerLambda.metricErrors({
      period: cdk.Duration.minutes(1),
    });
    // 👇 define a metric for lambda invocations
    // const functionInvocation = cdkSchedulerLambda.metricInvocations({
    //   period: cdk.Duration.minutes(1),
    // });

    // 👇 create an Alarm using the Alarm construct
    new cloudwatch.Alarm(this, 'lambda-errors-alarm', {
      metric: functionErrors,
      threshold: 1,
      comparisonOperator:
        cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      evaluationPeriods: 1,
      alarmDescription:
        'Alarm if the SUM of Errors is greater than or equal to the threshold (1) for 1 evaluation period',
    });

    new lambdajs.NodejsFunction(this, 'slack-lambda', {
      // bundling: {
      //   nodeModules: [
      //     'axios',
      //     'esbuild',
      //   ],
      // },
      // runtime: lambda.Runtime.NODEJS_14_X,
      entry: path.join(__dirname, '../src/lambda/slack.ts'),
      // handler: 'handler',
      timeout: cdk.Duration.seconds(60),
      environment: {
        SLACK_WEBHOOK: 'https://hooks.slack.com/services/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',
      },
    });

  }
}