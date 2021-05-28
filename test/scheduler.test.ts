/* eslint-disable @typescript-eslint/no-require-imports */
import * as lambda from 'aws-lambda';
// import { DescribeInstancesResult } from 'aws-sdk/clients/ec2';
import * as AWS from '../__mocks__/aws-sdk';
import { handler } from '../src/lambda/scheduler';

AWS.DynamoDB.Converter;
// const ec2 = new AWS.EC2();

describe('all', () => {
  test('simple create cfn', async () => {
    const response = await handler(event);
    expect(response).toEqual('done');
  });

  test('to much records', async () => {
    const response = await handler({ Records: [event.Records[0], event.Records[0]] });
    expect(response).toEqual('failed');
  });

  test('to less records', async () => {
    const response = await handler({ Records: [] });
    expect(response).toEqual('failed');
  });

  test('no dynamodb object found', async () => {
    const response = await handler({ Records: [{ awsRegion: 'klaro' }] });
    expect(response).toEqual('failed');
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