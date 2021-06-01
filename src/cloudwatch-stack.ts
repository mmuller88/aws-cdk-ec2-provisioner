import * as cw from '@aws-cdk/aws-cloudwatch';
import * as core from '@aws-cdk/core';
import { CustomStack } from 'aws-cdk-staging-pipeline/lib/custom-stack';

export interface CloudWatchStackProps extends core.StackProps {
  readonly stage: string;
}

export class CloudWatchStack extends CustomStack {
  constructor(scope: core.Construct, id: string, props: CloudWatchStackProps) {
    super(scope, id, props);

    const createUpdateMetric = new cw.Metric({
      namespace: 'Scheduler',
      metricName: 'CreateUpdateFailed',
    });

    new cw.Alarm(this, 'Alarm1', {
      metric: createUpdateMetric,
      threshold: 1,
      evaluationPeriods: 3,
      // datapointsToAlarm: 2,
    });

    const deleteMetric = new cw.Metric({
      namespace: 'Scheduler',
      metricName: 'DeleteFailed',
    });

    new cw.Alarm(this, 'Alarm2', {
      metric: deleteMetric,
      threshold: 1,
      evaluationPeriods: 3,
      // datapointsToAlarm: 2,
    });

    const eventMetric = new cw.Metric({
      namespace: 'Scheduler',
      metricName: 'EventFailed',
    });

    new cw.Alarm(this, 'Alarm3', {
      metric: eventMetric,
      threshold: 1,
      evaluationPeriods: 3,
      // datapointsToAlarm: 2,
    });

    const unknownMetric = new cw.Metric({
      namespace: 'Scheduler',
      metricName: 'UnknownFailed',
    });

    new cw.Alarm(this, 'Alarm4', {
      metric: unknownMetric,
      threshold: 1,
      evaluationPeriods: 3,
      // datapointsToAlarm: 2,
    });

  }
}