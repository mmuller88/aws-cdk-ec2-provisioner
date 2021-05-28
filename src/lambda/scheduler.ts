// eslint-disable-next-line import/no-extraneous-dependencies
import { readFileSync } from 'fs';
import * as lambda from 'aws-lambda';
// eslint-disable-next-line @typescript-eslint/no-require-imports
// const execSync = require('child_process').execSync;

import * as AWS from 'aws-sdk';
import { Ec2 } from './query-ec2';

const cfn = new AWS.CloudFormation();

export async function handler(event: lambda.DynamoDBStreamEvent) {
  // exports.handler = async (event/*: lambda.DynamoDBStreamEvent*/) => {
  console.debug(`event: ${JSON.stringify(event)}`);

  if (event.Records.length > 1) {
    console.debug('event not valid! Only one record allowed!');
  }

  let newImage: Ec2;
  if (event.Records[0].dynamodb?.NewImage) {
    newImage = AWS.DynamoDB.Converter.unmarshall(event.Records[0].dynamodb.NewImage) as Ec2;
  } else {
    console.debug('event not valid!');
    return 'failed';
  }

  const templateBody = readFileSync('./ec2-vm-stack.template.json', 'utf-8');
  console.debug(`templateBody: ${JSON.stringify(templateBody)}`);

  const createStackParams: AWS.CloudFormation.Types.CreateStackInput = {
    StackName: `stack-${newImage.userId ?? 'noUserId'}-${newImage.vmType ?? 'noVmType'}`,
    TemplateBody: templateBody,
    Capabilities: ['CAPABILITY_IAM'],
  };
  try {
    const createStackResult = await cfn.createStack(createStackParams).promise();
    console.debug(`createStackResult: ${JSON.stringify(createStackResult)}`);
  } catch (error) {
    const updateStackResult = await cfn.updateStack(createStackParams).promise();
    console.debug(`updateStackResult: ${JSON.stringify(updateStackResult)}`);
  }

  const waitForParams: AWS.CloudFormation.Types.DescribeStacksInput = {
    StackName: createStackParams.StackName,
  };
  const waitForResult = await cfn.waitFor('stackCreateComplete', waitForParams).promise();
  console.debug(`waitForResult: ${JSON.stringify(waitForResult)}`);

  return 'doneeee';
};