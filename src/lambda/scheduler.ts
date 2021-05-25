import * as lambda from 'aws-lambda';
import * as AWS from 'aws-sdk';

// const codebuild = new AWS.CodeBuild();

export async function handler(event: lambda.DynamoDBStreamEvent) {
  console.debug(`event: ${JSON.stringify(event)}`);

  return {
    statusCode: 200,
  };
};