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

export const stackTopicName = 'stackTopic';

export class CloudWatchStack extends CustomStack {
  constructor(scope: cdk.Construct, id: string, props: CloudWatchStackProps) {
    super(scope, id, props);

    const scheduler = lambda.Function.fromFunctionArn(this, 'schedulerLambda', `arn:aws:lambda:${this.region}:${this.account}:function:scheduler`);

    const queryEc2 = lambda.Function.fromFunctionArn(this, 'queryec2Lambda', `arn:aws:lambda:${this.region}:${this.account}:function:query-ec2`);

    const alarmTopic = new sns.Topic(this, 'alarmTopic');
    const stackTopic = new sns.Topic(this, 'stackTopic', {
      topicName: stackTopicName,
    });

    const slackWebhookToken = 'K7jRoppBpPUgT8aVWdYUipWz';
    const slackWebhook = 'https://hooks.slack.com/services/T023K9D3X0W/B023XP6RG4E/' + slackWebhookToken;

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

      alarm.addAlarmAction(new cw_actions.SnsAction(alarmTopic));

      // https://eu-central-1.console.aws.amazon.com/cloudwatch/home?region=eu-central-1#alarmsV2:alarm/scheduler?~(alarmStateFilter~'ALARM)
      const lambdaAlertToSlack = new lambdajs.NodejsFunction(this, 'slack-lambda-' + lam.functionName, {
        entry: path.join(__dirname, '../src/lambda/slack.ts'),
        // timeout: cdk.Duration.seconds(60),
        environment: {
          SLACK_WEBHOOK: slackWebhook,
          LINK: 'https://eu-central-1.console.aws.amazon.com/cloudwatch/home?region=eu-central-1#alarmsV2:?~(alarmStateFilter~\'ALARM)',
        },
      });

      lambdaAlertToSlack.addEventSource(new eventsource.SnsEventSource(alarmTopic));
    });

    const cfnAlertToSlack = new lambdajs.NodejsFunction(this, 'cfnAlertToSlack', {
      entry: path.join(__dirname, '../src/lambda/slack.ts'),
      // timeout: cdk.Duration.seconds(60),
      environment: {
        SLACK_WEBHOOK: slackWebhook,
        LINK: 'https://eu-central-1.console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks',
        // event message needs to contain one of the following
        FILTER: JSON.stringify(['ROLLBACK_COMPLETE', 'PhysicalResourceId=\'arn:aws:cloudformation', 'DELETE_FAILED', 'CREATE_FAILED']),
        // FILTER_WITH_ERROR: JSON.stringify(['ROLLBACK_COMPLETE', 'DELETE_FAILED', 'CREATE_FAILED']),
      },
    });
    cfnAlertToSlack.addEventSource(new eventsource.SnsEventSource(stackTopic));
  }
}