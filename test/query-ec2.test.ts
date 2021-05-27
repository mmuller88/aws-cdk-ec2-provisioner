/* eslint-disable @typescript-eslint/no-require-imports */
// import * as lambda from 'aws-lambda';
//import { ReservationList } from 'aws-sdk/clients/ec2';
import * as AWS from '../__mocks__/aws-sdk';
import { handler } from '../src/lambda/query-ec2';

// const ec2 = new AWS.EC2();

// test('queryStringParameters.projectName is not existing', async () => {
//   const event = {};
//   await handler(event).catch((reason: any) => {
//     console.log(`reason: ${reason}`);
//     expect(JSON.stringify(reason)).toContain('projectName in query parameter is not existing or empty!');
//   });
// });

test('simple listEc2', async () => {
  const mockResult = [
    {
      Instances: [{
        InstanceId: 'i-123',
        Tags: [
          { Key: 'Owner', Value: 'Hacklab' },
          { Key: 'Name', Value: 'doiiing' },
        ],
      }],
    },
  ];
  AWS.describeInstancesResponse.mockReturnValueOnce(mockResult);

  const event = { info: { fieldName: 'listEc2' } };
  const response = await handler(event);
  // expect(codebuild.listBuildsForProject).toHaveBeenCalledWith({ projectName: 'albern' });

  expect(response).toEqual([{
    id: 'i-123',
    name: 'doiiing',
    state: 'RUNNING',
  }]);
});