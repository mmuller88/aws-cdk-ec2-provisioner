import * as appsync from '@aws-cdk/aws-appsync';
import * as cognito from '@aws-cdk/aws-cognito';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdajs from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
// import * as db from '@aws-cdk/aws-dynamodb';
import { CustomStack } from 'aws-cdk-staging-pipeline/lib/custom-stack';
import { AppSyncTransformer } from 'cdk-appsync-transformer';
import * as statement from 'cdk-iam-floyd';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

export interface AppSyncStackProps extends cdk.StackProps {
  readonly stage: string;
  readonly userPoolId?: string;
}

export class AppSyncStack extends CustomStack {
  appSyncTransformer: AppSyncTransformer;
  constructor(scope: cdk.Construct, id: string, props: AppSyncStackProps) {
    super(scope, id, props);

    let userPool;
    // import existing userpool
    if (props.userPoolId) {
      userPool = cognito.UserPool.fromUserPoolArn(this, 'user-pool', `arn:aws:cognito-idp:${this.region}:${this.account}:userpool/${this.region}_${props.userPoolId}`);
    } else {
      userPool = new cognito.UserPool(this, 'user-pool', {
        removalPolicy: cdk.RemovalPolicy.RETAIN,
        passwordPolicy: {
          minLength: 6,
          requireLowercase: false,
          requireUppercase: false,
          requireDigits: false,
          requireSymbols: false,
        },
        selfSignUpEnabled: true,
        autoVerify: {
          email: true,
        },
        standardAttributes: {
          email: {
            mutable: true,
            required: true,
          },
          phoneNumber: {
            mutable: true,
            required: true,
          },
        },
        signInAliases: {
          username: true,
        },
      });
    }

    const userPoolClient = new cognito.UserPoolClient(this, 'demo-user-pool-client', {
      userPool,
      generateSecret: false,
    });

    const identityPool = new cognito.CfnIdentityPool(this, id, {
      identityPoolName: 'demo-identity-pool',
      cognitoIdentityProviders: [
        {
          clientId: userPoolClient.userPoolClientId,
          providerName: `cognito-idp.${this.region}.amazonaws.com/${userPool.userPoolId}`,
        },
      ],
      allowUnauthenticatedIdentities: true,
    });

    const unAuthPrincipal = new iam.WebIdentityPrincipal('cognito-identity.amazonaws.com')
      .withConditions({
        'StringEquals': { 'cognito-identity.amazonaws.com:aud': `${identityPool.ref}` },
        'ForAnyValue:StringLike': { 'cognito-identity.amazonaws.com:amr': 'unauthenticated' },
      });

    const unauthRole = new iam.Role(this, 'demo-identity-unauth-role', {
      assumedBy: unAuthPrincipal,
    });

    new cognito.CfnIdentityPoolRoleAttachment(this, `${id}-role-map`, {
      identityPoolId: identityPool.ref,
      roles: {
        unauthenticated: unauthRole.roleArn,
      },
    });

    // const todoTable = new db.Table(this, 'TodoTable', {
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    //   partitionKey: {
    //     name: 'id',
    //     type: db.AttributeType.STRING,
    //   },
    // });

    this.appSyncTransformer = new AppSyncTransformer(this, 'GraphQlApi', {
      apiName: 'ec2-pro-api',
      schemaPath: './schema.graphql',
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool: userPool,
            defaultAction: appsync.UserPoolDefaultAction.ALLOW,
          },
        },
        additionalAuthorizationModes: [
          {
            authorizationType: appsync.AuthorizationType.IAM,
          },
        ],
      },
    });

    const queryEc2 = new lambdajs.NodejsFunction(this, 'queryEc2LambdaJs', {
      runtime: lambda.Runtime.NODEJS_12_X,
      entry: `${path.join(__dirname)}/lambda/query-ec2.ts`,
    });

    queryEc2.addToRolePolicy(new statement.Ec2().allow().toDescribeInstances());

    this.appSyncTransformer.addLambdaDataSourceAndResolvers('queryEc2', 'queryEc2', queryEc2);

    const publicRole = new iam.Role(this, 'public-role', {
      assumedBy: new iam.WebIdentityPrincipal('cognito-identity.amazonaws.com')
        .withConditions({
          'StringEquals': { 'cognito-identity.amazonaws.com:aud': `${identityPool.ref}` },
          'ForAnyValue:StringLike': { 'cognito-identity.amazonaws.com:amr': 'unauthenticated' },
        }),
    });

    this.appSyncTransformer.grantPublic(publicRole);

    // Add allowed queries to the unauthorized identity pool role
    unauthRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          'appsync:GraphQL',
        ],
        resources: [
          // Queries
          `arn:aws:appsync:${this.region}:${this.account}:apis/${this.appSyncTransformer.appsyncAPI.apiId}/types/Query/fields/listPosts`,
          `arn:aws:appsync:${this.region}:${this.account}:apis/${this.appSyncTransformer.appsyncAPI.apiId}/types/Query/fields/listMessages`,
          `arn:aws:appsync:${this.region}:${this.account}:apis/${this.appSyncTransformer.appsyncAPI.apiId}/types/Query/fields/getPost`,
          `arn:aws:appsync:${this.region}:${this.account}:apis/${this.appSyncTransformer.appsyncAPI.apiId}/types/Query/fields/getMessage`,
        ],
      }),
    );

    // const todoDS = this.appSyncTransformer.addDynamoDbDataSource('todoDataSource', todoTable);

    // todoDS.createResolver({
    //   typeName: 'Query',
    //   fieldName: 'todoList',
    //   requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
    //   responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    // });

    // todoDS.createResolver({
    //   typeName: 'Mutation',
    //   fieldName: 'todoAdd',
    //   requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(appsync.PrimaryKey.partition('id').auto(), appsync.Values.attribute('body').is('$ctx.args.body').attribute('username').is('$ctx.args.username')),
    //   responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    // });

    // todoDS.createResolver({
    //   typeName: 'Mutation',
    //   fieldName: 'todoRemove',
    //   requestMappingTemplate: appsync.MappingTemplate.dynamoDbDeleteItem('id', 'id'),
    //   responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    // });

    // Outputs
    const graphql = new cdk.CfnOutput(this, 'appsyncEndpointOutput', {
      description: 'GraphQL Endpoint',
      value: this.appSyncTransformer.appsyncAPI.graphqlUrl,
    });
    this.cfnOutputs.appsyncEndpointOutput = graphql;

    new cdk.CfnOutput(this, 'awsUserPoolId', {
      description: 'userPoolID value for amplify exports',
      value: userPool.userPoolId,
    });

    new cdk.CfnOutput(this, 'awsUserPoolWebClientId', {
      description: 'userPoolClientID value for amplify exports',
      value: userPoolClient.userPoolClientId,
    });

    new cdk.CfnOutput(this, 'awsIdentityPoolId', {
      description: 'identityPoolID value for amplify exports',
      value: identityPool.ref,
    });

    new cdk.CfnOutput(this, 'awsAppsyncAuthenticationType', {
      value: appsync.AuthorizationType.IAM,
    });
  }
}