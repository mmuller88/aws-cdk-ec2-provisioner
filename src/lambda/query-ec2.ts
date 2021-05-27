// eslint-disable-next-line import/no-extraneous-dependencies
// import * as lambda from 'aws-lambda';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as AWS from 'aws-sdk';
// import { Ec2, State } from './../../frontend/src/lib/api';
const ec2 = new AWS.EC2();

// export interface QueryEc2Props {

// }

// export type InstanceStateName = "pending"|"running"|"shutting-down"|"terminated"|"stopping"|"stopped"|string;

export type Ec2 = {
  id: string;
  name: string;
  state: string;
};

export interface ResolverEvent {
  field: string;
  // arguments: {};
}

export interface Error {
  errorMessage: string;
  errorType: string;
}

export async function handler(event: ResolverEvent/*, context: lambda.AppSyncResolverEvent<QueryEc2Props>*/) {
  // exports.handler = async (event/*: lambda.DynamoDBStreamEvent*/) => {
  console.debug(`event: ${JSON.stringify(event)}`);

  console.debug('Got an Invoke Request.');
  let result: Ec2[] | Error | string = 'no result';
  switch (event.field) {
    case 'listEc2':
      const describeInstances = await ec2.describeInstances().promise();
      const lookupInstances = describeInstances.Reservations?.[0].Instances?.filter(i => i.Tags?.filter(t => t.Key === 'Owner' && t.Value === 'Hacklab'));
      const instances: Ec2[] = [];
      if (lookupInstances) {
        for (const instance of lookupInstances) {
          instances.push({
            id: instance.InstanceId || 'noId',
            name: instance.Tags?.filter(t => t.Key == 'Name')[0].Value || 'noName',
            state: instance.State?.Name?.toUpperCase() || 'UNKOWN',
          });
        }
      }
      result = instances;
      break;
    default:
      const error: Error = { errorMessage: 'Unknown field, unable to resolve', errorType: 'MISSING' };
      console.debug(JSON.stringify(error));
      result = error;
  }

  console.debug('Result: ' + result);
  return result;
  // {
  //   statusCode: 200,
  // };
};