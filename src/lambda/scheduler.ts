// eslint-disable-next-line import/no-extraneous-dependencies
import * as lambda from 'aws-lambda';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const execSync = require('child_process').execSync;

// import * as AWS from 'aws-sdk';

// const codebuild = new AWS.CodeBuild();

export async function handler(event: lambda.DynamoDBStreamEvent) {
  // exports.handler = async (event/*: lambda.DynamoDBStreamEvent*/) => {
  console.debug(`event: ${JSON.stringify(event)}`);

  let res;
  try {
    res = execSync("cdk --app cdk.out deploy 'ec2-vm-stack' -c userId=martin -c vmType=3 --require-approval never");
  } catch (err) {
    console.debug(`err: ${err}`);
  }
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

  console.debug(`res: ${JSON.stringify(res)}`);

  return 'doneeee';
  // {
  //   statusCode: 200,
  // };
};