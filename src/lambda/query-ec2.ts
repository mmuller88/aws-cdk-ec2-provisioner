// eslint-disable-next-line import/no-extraneous-dependencies
import * as lambda from 'aws-lambda';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as AWS from 'aws-sdk';
// import { Ec2, State } from './../../frontend/src/lib/api';
const ec2 = new AWS.EC2();
const ssm = new AWS.SecretsManager();

export interface QueryEc2Args {

}

// export type InstanceStateName = "pending"|"running"|"shutting-down"|"terminated"|"stopping"|"stopped"|string;

export type Ec2 = {
  id: string;
  name: string;
  state: string;
  userId: string;
  vmType: number;
  publicDnsName: string;
  privateKey: string;
};

// export interface ResolverEvent {
//   field: string;
//   // arguments: {};
// }

export interface Error {
  errorMessage: string;
  errorType: string;
}

export async function handler(event: lambda.AppSyncResolverEvent<QueryEc2Args> | any) {
  // exports.handler = async (event/*: lambda.DynamoDBStreamEvent*/) => {
  console.debug(`event: ${JSON.stringify(event)}`);

  console.debug('Got an Invoke Request.');
  let result: Ec2[] | Error | string = 'no result';
  switch (event.info.fieldName) {
    case 'listEc2':
      const describeInstances = await ec2.describeInstances().promise();
      console.debug(`describeInstances: ${JSON.stringify(describeInstances)}`);
      const lookupInstances = describeInstances.Reservations?.map(r => r.Instances?.[0]).filter(i => i?.Tags?.filter(t => t.Key === 'Owner' && t.Value === 'Hacklab') != null);
      console.debug(`lookupInstances: ${JSON.stringify(lookupInstances)}`);
      let instances: Ec2[] = [];
      if (lookupInstances) {
        try {
          for (const instance of lookupInstances) {
            if (instance) {
              console.debug(`instance: ${JSON.stringify(instance)}`);
              const userId = instance.Tags?.filter(t => t.Key == 'UserId')[0].Value || 'noUserId';
              const vmType = Number(instance.Tags?.filter(t => t.Key == 'VmType')[0].Value) || -1;
              const getSecretValueParam: AWS.SecretsManager.Types.GetSecretValueRequest = { SecretId: `ec2-ssh-key/key-${userId}-${vmType}/private` };
              console.debug(`getSecretValueParam: ${JSON.stringify(getSecretValueParam)}`);
              let getSecretValueResult;
              try {
                getSecretValueResult = await ssm.getSecretValue(getSecretValueParam).promise();
              } catch (error) {
                console.debug(`Couldn't get the ssm secret with error: ${JSON.stringify(error)}. But ignoringt that!`);
              }
              console.debug(`getSecretValueResult: ${JSON.stringify(getSecretValueResult)}`);
              instances.push({
                id: instance.InstanceId || 'noId',
                name: instance.Tags?.filter(t => t.Key == 'Name')[0].Value || 'noName',
                state: instance.State?.Name?.toUpperCase() || 'UNKOWN',
                userId,
                vmType,
                publicDnsName: instance.PublicDnsName || 'noIp',
                privateKey: getSecretValueResult?.SecretString || 'noKey',
              });
            }
          }
        } catch (error) {
          return { errorMessage: `parsing failed: ${JSON.stringify(error)}`, errorType: 'PARSING' };
        }
      }
      console.debug(`instances: ${JSON.stringify(instances)}`);
      return instances.length === 0 ? null : instances;
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