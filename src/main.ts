import * as core from '@aws-cdk/core';
import { PipelineStack } from 'aws-cdk-staging-pipeline';
// import { CustomStack } from 'aws-cdk-staging-pipeline/lib/custom-stack';
// import { AppSyncStack } from './appsync-stack';
import { Ec2ProStack } from './ec2-pro-stack';
import { Ec2Stack } from './ec2/ec2-stack';
// import { StaticSite } from './static-site';

const app = new core.App();

new PipelineStack(app, 'ec2-provisioner-pipeline', {
  stackName: 'ec2-provisioner-pipeline',
  // Account and region where the pipeline will be build
  env: {
    account: '981237193288',
    region: 'eu-central-1',
  },
  // Staging Accounts e.g. dev qa prod
  stageAccounts: [{
    account: {
      id: '981237193288',
      region: 'eu-central-1',
    },
    stage: 'dev',
  }, {
    account: {
      id: '981237193288',
      region: 'us-east-1',
    },
    stage: 'prod',
  }],
  branch: 'main',
  repositoryName: 'aws-cdk-ec2-provisioner',
  buildCommand: 'cd frontend && yarn install && yarn build && cd ..',
  customStack: (scope, stageAccount) => {
    // const stack = new CustomStack(scope, `ec2-pro-all-${stageAccount.stage}`, {
    //   stackName: `ec2-pro-all-${stageAccount.stage}`,
    // });

    const stack = new Ec2ProStack(scope, `ec2-pro-all-${stageAccount.stage}`, {
      stackName: `ec2-pro-all-${stageAccount.stage}`,
      stage: stageAccount.stage,
      userPoolId: stageAccount.stage == 'dev' ? 'SSeYXA58i' : 'ooNdbca3A',
    });

    // const appsync = new AppSyncStack(scope, `ec2-provisioner-stack-${stageAccount.stage}`, {
    //   stackName: `ec2-provisioner-stack-${stageAccount.stage}`,
    //   stage: stageAccount.stage,
    // });

    // const staticsite = new StaticSite(scope, `ec2-provisioner-ui-stack-${stageAccount.stage}`, {
    //   stackName: `ec2-provisioner-ui-stack-${stageAccount.stage}`,
    //   stage: stageAccount.stage,
    // });

    return stack;
  },
  // which stage needs a manual approval. Here is only prod
  manualApprovals: (stageAccount) => stageAccount.stage === 'prod',
  // not much test magic here yet. Will soon setup some Postman integration tests Check the property for instructions!
  testCommands: (stageAccount) => [
    `echo "${stageAccount.stage} stage"`,
    'STATUSCODE=$(curl --silent --output /dev/stderr --write-out "%{http_code}" $bucketWebsiteUrl)',
    'echo Statuscode = $STATUSCODE',
    'if test $STATUSCODE -ne 200; then exit 1; fi',
    //
    `echo "${stageAccount.stage} stage"`,
    'STATUSCODE=$(curl --silent --output /dev/stderr --write-out "%{http_code}" $appsyncEndpointOutput)',
    'echo Statuscode = $STATUSCODE',
    'if test $STATUSCODE -ne 401; then exit 1; fi',
  ],
  gitHub: {
    owner: 'mmuller88',
    oauthToken: core.SecretValue.secretsManager('alfcdk', {
      jsonField: 'muller88-github-token',
    }),
  },
});

new PipelineStack(app, 'ec2-pro-vm-pipeline', {
  stackName: 'ec2-pro-vm-pipeline',
  // Account and region where the pipeline will be build
  env: {
    account: '981237193288',
    region: 'eu-central-1',
  },
  // Staging Accounts e.g. dev qa prod
  stageAccounts: [{
    account: {
      id: '981237193288',
      region: 'eu-central-1',
    },
    stage: 'dev',
  }],
  branch: 'main',
  repositoryName: 'aws-cdk-ec2-provisioner',
  customStack: (scope, stageAccount) => {

    const stack = new Ec2Stack(scope, `ec2-stack-${stageAccount.stage}`, {
      stackName: `ec2-stack-${stageAccount.stage}`,
      stage: stageAccount.stage,
    });

    return stack;
  },
  // which stage needs a manual approval. Here is only prod
  manualApprovals: (stageAccount) => stageAccount.stage === 'prod',
  // not much test magic here yet. Will soon setup some Postman integration tests Check the property for instructions!
  testCommands: (stageAccount) => [
    `echo "${stageAccount.stage} stage"`,
    // 'STATUSCODE=$(curl --silent --output /dev/stderr --write-out "%{http_code}" $bucketWebsiteUrl)',
    // 'echo Statuscode = $STATUSCODE',
    // 'if test $STATUSCODE -ne 200; then exit 1; fi',
    //
    `echo "${stageAccount.stage} stage"`,
    // 'STATUSCODE=$(curl --silent --output /dev/stderr --write-out "%{http_code}" $appsyncEndpointOutput)',
    // 'echo Statuscode = $STATUSCODE',
    // 'if test $STATUSCODE -ne 401; then exit 1; fi',
  ],
  gitHub: {
    owner: 'mmuller88',
    oauthToken: core.SecretValue.secretsManager('alfcdk', {
      jsonField: 'muller88-github-token',
    }),
  },
});

app.synth();