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
      unit: cw.Unit.COUNT,
      statistic: 'SampleCount',
    });

    new cw.Alarm(this, 'createUpdateAlarm', {
      metric: createUpdateMetric,
      threshold: 1,
      evaluationPeriods: 1,
      // datapointsToAlarm: 2,
    });

    const deleteMetric = new cw.Metric({
      namespace: 'Scheduler',
      metricName: 'DeleteFailed',
      unit: cw.Unit.COUNT,
      statistic: 'SampleCount',
    });

    new cw.Alarm(this, 'deleteMetricAlarm', {
      metric: deleteMetric,
      threshold: 1,
      evaluationPeriods: 1,
      // datapointsToAlarm: 2,
    });

    const eventMetric = new cw.Metric({
      namespace: 'Scheduler',
      metricName: 'EventFailed',
      unit: cw.Unit.COUNT,
      statistic: 'SampleCount',
    });

    new cw.Alarm(this, 'eventMetricAlarm', {
      metric: eventMetric,
      threshold: 1,
      evaluationPeriods: 1,
      // datapointsToAlarm: 2,
    });

    const unknownMetric = new cw.Metric({
      namespace: 'Scheduler',
      metricName: 'UnknownFailed',
      unit: cw.Unit.COUNT,
      statistic: 'SampleCount',
    });

    new cw.Alarm(this, 'unknownMetricAlarm', {
      metric: unknownMetric,
      threshold: 1,
      evaluationPeriods: 1,
      // datapointsToAlarm: 2,
    });

  }
}