/* eslint-disable @typescript-eslint/no-require-imports */
import * as lambda from 'aws-lambda';
// import { DescribeInstancesResult } from 'aws-sdk/clients/ec2';
import * as AWS from '../__mocks__/aws-sdk';
import { handler } from '../src/lambda/scheduler';

AWS.DynamoDB.Converter;
const cloudwatch = new AWS.CloudWatch();

describe('all', () => {
  test('create / update cfn successfully', async () => {
    let response = await handler(event);
    expect(response).toEqual('success');
    response = await handler({
      Records: [{
        dynamodb: {
          NewImage: event.Records[0]!.dynamodb!.NewImage!,
          OldImage: event.Records[0]!.dynamodb!.NewImage!,
        },
      }],
    });
    expect(response).toEqual('success');
  });

  test('delete cfn when no new Image but old Image', async () => {
    let response = await handler({ Records: [{ dynamodb: { OldImage: event.Records[0]!.dynamodb!.NewImage! } }] });
    expect(response).toEqual('deleted');
  });

  test('creation failed', async () => {
    AWS.createStackResponse.mockRejectedValue(new Error('To much CFN stacks!'));
    AWS.updateStackResponse.mockRejectedValue(new Error('No Stack with that Name!'));
    let response = await handler(event);
    expect(cloudwatch.putMetricData).toHaveBeenCalledWith({
      Namespace: 'Scheduler',
      MetricData: [{
        MetricName: 'CreateUpdateFailed',
      }],
    });
    expect(response).toEqual('CreateUpdateFailed');
  });

  test('update failed', async () => {
    AWS.createStackResponse.mockRejectedValue(new Error('Stack already exist'));
    AWS.updateStackResponse.mockRejectedValue(new Error('Can not update!'));
    let response = await handler(event);
    expect(cloudwatch.putMetricData).toHaveBeenCalledWith({
      Namespace: 'Scheduler',
      MetricData: [{
        MetricName: 'CreateUpdateFailed',
      }],
    });
    expect(response).toEqual('CreateUpdateFailed');
  });

  test('delete failed', async () => {
    AWS.deleteStackResponse.mockRejectedValue(new Error('Could not delete Stack'));
    let response = await handler({ Records: [{ dynamodb: { OldImage: event.Records[0]!.dynamodb!.NewImage! } }] });
    expect(cloudwatch.putMetricData).toHaveBeenCalledWith({
      Namespace: 'Scheduler',
      MetricData: [{
        MetricName: 'DeleteFailed',
      }],
    });
    expect(response).toEqual('DeleteFailed');
  });

  test('fail when no new Image and no old Image', async () => {
    let response = await handler({ Records: [{ dynamodb: { SizeBytes: 2 } }] });
    expect(cloudwatch.putMetricData).toHaveBeenCalledWith({
      Namespace: 'Scheduler',
      MetricData: [{
        MetricName: 'UnknownFailed',
      }],
    });
    expect(response).toEqual('UnknownFailed');
  });

  test('to much records', async () => {
    const response = await handler({ Records: [event.Records[0], event.Records[0]] });
    expect(cloudwatch.putMetricData).toHaveBeenCalledWith({
      Namespace: 'Scheduler',
      MetricData: [{
        MetricName: 'EventFailed',
      }],
    });
    expect(response).toEqual('EventFailed');
  });

  test('to less records', async () => {
    const response = await handler({ Records: [] });
    expect(cloudwatch.putMetricData).toHaveBeenCalledWith({
      Namespace: 'Scheduler',
      MetricData: [{
        MetricName: 'EventFailed',
      }],
    });
    expect(response).toEqual('EventFailed');
  });

  test('no dynamodb object found', async () => {
    const response = await handler({ Records: [{ awsRegion: 'klaro' }] });
    expect(cloudwatch.putMetricData).toHaveBeenCalledWith({
      Namespace: 'Scheduler',
      MetricData: [{
        MetricName: 'EventFailed',
      }],
    });
    expect(response).toEqual('EventFailed');
  });
});

let event: lambda.DynamoDBStreamEvent = {
  Records: [
    {
      dynamodb: {
        NewImage: {
          owner: {
            S: 'martin',
          },
          createdAt: {
            S: '2021-05-28T11:29:40.705Z',
          },
          vmType: {
            N: '1',
          },
          __typename: {
            S: 'Ec2Config',
          },
          id: {
            S: '37477c52-a33c-4758-8b33-8e0dba3cf64a',
          },
          userId: {
            S: 'mart',
          },
          startDate: {
            S: '2021-05-19T03:00:00.000Z',
          },
          stopDate: {
            S: '2021-05-20T03:00:00.000Z',
          },
          updatedAt: {
            S: '2021-05-28T11:29:40.705Z',
          },
        },
      },
    },
  ],
};