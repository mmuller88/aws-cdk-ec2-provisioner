// eslint-disable-next-line import/no-extraneous-dependencies
import { readFileSync } from 'fs';
import * as lambda from 'aws-lambda';
// eslint-disable-next-line @typescript-eslint/no-require-imports
// const execSync = require('child_process').execSync;

import * as AWS from 'aws-sdk';

const cfn = new AWS.CloudFormation();

export async function handler(event: lambda.DynamoDBStreamEvent) {
  // exports.handler = async (event/*: lambda.DynamoDBStreamEvent*/) => {

  console.debug(`event: ${JSON.stringify(event)}`);

  const templateBody = readFileSync('./ec2-vm-stack.template.json', 'utf-8');
  console.debug(`templateBody: ${JSON.stringify(templateBody)}`);

  const params: AWS.CloudFormation.Types.CreateStackInput = {
    StackName: 'bulla',
    TemplateBody: templateBody,
  };
  const result = await cfn.createStack(params).promise();

  // let res;
  // try {
  //   res = execSync("node_modules/aws-cdk/bin/cdk deploy 'ec2-vm-stack' -c userId=martino -c vmType=2 --require-approval never");
  // } catch (err) {
  //   console.debug(`err: ${err}`);
  // }
  // , (error: any, stdout: any, stderr: any) => {
  //   if (error) {
  //     console.debug(`error: ${error.message}`);
  //     return;
  //   }
  //   if (stderr) {
  //     console.debug(`stderr: ${stderr}`);
  //     return;
  //   }
  //   console.log(`stdout: ${stdout}`);
  // });

  console.debug(`result: ${JSON.stringify(result)}`);

  return 'doneeee';
  // {
  //   statusCode: 200,
  // };
};