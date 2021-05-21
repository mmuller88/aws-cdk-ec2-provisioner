import * as core from '@aws-cdk/core';
import { PipelineStack } from 'aws-cdk-staging-pipeline';;
import { Ec2Stack } from './ec2-stack';

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