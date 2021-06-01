// eslint-disable-next-line import/no-extraneous-dependencies
import { readFileSync } from 'fs';
import * as lambda from 'aws-lambda';

import * as AWS from 'aws-sdk';
import { Ec2 } from './query-ec2';

const cfn = new AWS.CloudFormation();
const cw = new AWS.CloudWatch();

export async function handler(event: lambda.DynamoDBStreamEvent | any) {
  console.debug(`event: ${JSON.stringify(event)}`);

  if (!event.Records || event.Records.length !== 1 || !event.Records[0].dynamodb) {
    console.debug('event object not valid!');
    const putMetricDataParam: AWS.CloudWatch.Types.PutMetricDataInput = {
      Namespace: 'Scheduler',
      MetricData: [{
        MetricName: 'EventFailed',
        Dimensions: [
          {
            Name: 'UNIQUE_PAGES',
            Value: 'URLS',
          },
        ],
        // Timestamp: new Date(),
        Unit: 'Count',
        Value: 1.0,
      }],
    };
    console.debug(`putMetricDataParam: ${JSON.stringify(putMetricDataParam)}`);
    const putMetricDataResult = await cw.putMetricData(putMetricDataParam).promise();
    console.debug(`putMetricDataResult: ${JSON.stringify(putMetricDataResult)}`);
    return 'EventFailed';
  }

  try {
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
        StackName: `stack-${newImage.userId ?? 'noUserId'}-${newImage.vmType ?? '-1'}`,
        TemplateBody: templateBody,
        Capabilities: ['CAPABILITY_IAM', 'CAPABILITY_NAMED_IAM'],
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
        console.debug(`Creating failed with this error: ${JSON.stringify(error)}`);
        let updateStackResult;
        try {
          updateStackResult = await cfn.updateStack(createStackParams).promise();
        } catch (updateError) {
          const putMetricDataParam: AWS.CloudWatch.Types.PutMetricDataInput = {
            Namespace: 'Scheduler',
            MetricData: [{
              MetricName: 'CreateUpdateFailed',
              Dimensions: [
                {
                  Name: 'UNIQUE_PAGES',
                  Value: 'URLS',
                },
              ],
              Unit: 'Count',
              Value: 1.0,
            }],
          };
          console.debug(`putMetricDataParam: ${JSON.stringify(putMetricDataParam)}`);
          const putMetricDataResult = await cw.putMetricData(putMetricDataParam).promise();
          console.debug(`putMetricDataResult: ${JSON.stringify(putMetricDataResult)}`);
          return 'CreateUpdateFailed';
        }
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
        let deleteStackResult;
        try {
          deleteStackResult = await cfn.deleteStack(deleteStackParams).promise();
        } catch (error) {
          const putMetricDataParam: AWS.CloudWatch.Types.PutMetricDataInput = {
            Namespace: 'Scheduler',
            MetricData: [{
              MetricName: 'DeleteFailed',
              Dimensions: [
                {
                  Name: 'UNIQUE_PAGES',
                  Value: 'URLS',
                },
              ],
              Unit: 'Count',
              Value: 1.0,
            }],
          };
          console.debug(`putMetricDataParam: ${JSON.stringify(putMetricDataParam)}`);
          const putMetricDataResult = await cw.putMetricData(putMetricDataParam).promise();
          console.debug(`putMetricDataResult: ${JSON.stringify(putMetricDataResult)}`);
          return 'DeleteFailed';
        }
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
  } catch (error) {
    // just forward
  }
  console.debug('event not valid! Exactly one record allowed!');
  const putMetricDataParam: AWS.CloudWatch.Types.PutMetricDataInput = {
    Namespace: 'Scheduler',
    MetricData: [{
      MetricName: 'UnknownFailed',
      Dimensions: [
        {
          Name: 'UNIQUE_PAGES',
          Value: 'URLS',
        },
      ],
      Unit: 'Count',
      Value: 1.0,
    }],
  };
  console.debug(`putMetricDataParam: ${JSON.stringify(putMetricDataParam)}`);
  const putMetricDataResult = await cw.putMetricData(putMetricDataParam).promise();
  console.debug(`putMetricDataResult: ${JSON.stringify(putMetricDataResult)}`);
  return 'UnknownFailed';
};