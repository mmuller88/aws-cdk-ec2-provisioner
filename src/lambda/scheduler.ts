// eslint-disable-next-line import/no-extraneous-dependencies
import { readFileSync } from 'fs';
import * as lambda from 'aws-lambda';

import * as AWS from 'aws-sdk';
import { Ec2 } from './query-ec2';

const cfn = new AWS.CloudFormation();

export async function handler(event: lambda.DynamoDBStreamEvent) {
  console.debug(`event: ${JSON.stringify(event)}`);

  if (event.Records.length !== 1) {
    console.debug('event not valid! Exactly one record allowed!');
    return 'failed';
  }

  let newImage: Ec2 | null = null;
  if (event.Records[0].dynamodb?.NewImage) {
    newImage = AWS.DynamoDB.Converter.unmarshall(event.Records[0].dynamodb.NewImage) as Ec2;
  } else {
    console.debug('no NewImage existing');
  }

  let oldImage: Ec2 | null = null;
  if (event.Records[0].dynamodb?.OldImage) {
    oldImage = AWS.DynamoDB.Converter.unmarshall(event.Records[0].dynamodb.OldImage) as Ec2;
  } else {
    console.debug('no OldImage existing');
  }

  const templateBody = readFileSync('./ec2-vm-stack.template.json', 'utf-8');
  console.debug(`templateBody: ${JSON.stringify(templateBody)}`);

  if (newImage) {
    console.debug('Having NewImage so creating or updating');
    const createStackParams: AWS.CloudFormation.Types.CreateStackInput = {
      StackName: `stack-${newImage.userId ?? 'noUserId'}-${newImage.vmType ?? 'noVmType'}`,
      TemplateBody: templateBody,
      Capabilities: ['CAPABILITY_IAM'],
      Parameters: [{
        ParameterKey: 'userIdParam',
        ParameterValue: newImage.userId,
      }, {
        ParameterKey: 'vmTypeParam',
        ParameterValue: newImage.vmType.toString(),
      }],
    };
    console.debug(`createStackParams: ${JSON.stringify(createStackParams)}`);
    try {
      const createStackResult = await cfn.createStack(createStackParams).promise();
      console.debug(`createStackResult: ${JSON.stringify(createStackResult)}`);
    } catch (error) {
      const updateStackResult = await cfn.updateStack(createStackParams).promise();
      console.debug(`updateStackResult: ${JSON.stringify(updateStackResult)}`);
    }

    // const waitForParams: AWS.CloudFormation.Types.DescribeStacksInput = {
    //   StackName: createStackParams.StackName,
    // };
    // console.debug(`waitForParams: ${JSON.stringify(waitForParams)}`);
    // const waitForResult = await cfn.waitFor('stackCreateComplete', waitForParams).promise();
    // console.debug(`waitForResult: ${JSON.stringify(waitForResult)}`);
    return 'success';
  } else {
    if (oldImage) {
      console.debug('Having no NewImage but OldImage so deleting!');
      const deleteStackParams: AWS.CloudFormation.Types.DeleteStackInput = {
        StackName: `stack-${oldImage.userId ?? 'noUserId'}-${oldImage.vmType ?? 'noVmType'}`,
      };
      console.debug(`deleteStackParams: ${JSON.stringify(deleteStackParams)}`);
      const deleteStackResult = await cfn.deleteStack(deleteStackParams).promise();
      console.debug(`deleteStackResult: ${JSON.stringify(deleteStackResult)}`);

      // const waitForParams: AWS.CloudFormation.Types.DescribeStacksInput = {
      //   StackName: deleteStackParams.StackName,
      // };
      // console.debug(`waitForParams: ${JSON.stringify(waitForParams)}`);
      // const waitForResult = await cfn.waitFor('stackDeleteComplete', waitForParams).promise();
      // console.debug(`waitForResult: ${JSON.stringify(waitForResult)}`);
      return 'deleted';
    }
  }
  return 'failed';
};