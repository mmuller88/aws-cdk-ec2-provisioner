import * as path from 'path';
import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as cw_actions from '@aws-cdk/aws-cloudwatch-actions';
import * as lambda from '@aws-cdk/aws-lambda';
import * as eventsource from '@aws-cdk/aws-lambda-event-sources';
import * as lambdajs from '@aws-cdk/aws-lambda-nodejs';
import * as sns from '@aws-cdk/aws-sns';
import * as cdk from '@aws-cdk/core';

import { CustomStack } from 'aws-cdk-staging-pipeline/lib/custom-stack';

export interface CloudWatchStackProps extends cdk.StackProps {
  readonly stage: string;
}

export class CloudWatchStack extends CustomStack {
  constructor(scope: cdk.Construct, id: string, props: CloudWatchStackProps) {
    super(scope, id, props);

    const scheduler = lambda.Function.fromFunctionArn(this, 'schedulerLambda', `arn:aws:lambda:${this.region}:${this.account}:function:scheduler`);

    const queryEc2 = lambda.Function.fromFunctionArn(this, 'queryec2Lambda', `arn:aws:lambda:${this.region}:${this.account}:function:query-ec2`);

    const topic = new sns.Topic(this, 'AlarmTopic');

    [scheduler, queryEc2].map((lam, i) => {
      const lambdaError = lam.metricErrors({
        period: cdk.Duration.minutes(1),
      });

      // 👇 create an Alarm using the Alarm construct
      const alarm = new cloudwatch.Alarm(this, 'lambda-error-' + i, {
        alarmName: lam.functionName,
        metric: lambdaError,
        threshold: 1,
        comparisonOperator:
          cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
        evaluationPeriods: 1,
        alarmDescription:
          'Alarm if the SUM of Errors is greater than or equal to the threshold (1) for 1 evaluation period',
      });

      alarm.addAlarmAction(new cw_actions.SnsAction(topic));

      const slackLambda = new lambdajs.NodejsFunction(this, 'slack-lambda' + i, {
        entry: path.join(__dirname, '../src/lambda/slack.ts'),
        timeout: cdk.Duration.seconds(60),
        environment: {
          SLACK_WEBHOOK: 'https://hooks.slack.com/services/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',
        },
      });

      slackLambda.addEventSource(new eventsource.SnsEventSource(topic));
    });
  }
}