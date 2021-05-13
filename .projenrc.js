const { web, AwsCdkTypeScriptApp } = require('projen');

const project = new AwsCdkTypeScriptApp({
  authorAddress: 'damadden88@googlemail.com',
  authorName: 'martin.mueller',
  name: 'aws-cdk-ec2-provisioner',
  defaultReleaseBranch: 'main',
  cdkVersion: '1.103.0',
  cdkVersionPinning: true,
  cdkDependencies: [
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-s3-deployment',
    '@aws-cdk/aws-s3',
    '@aws-cdk/aws-codepipeline',
    '@aws-cdk/aws-codepipeline-actions',
    '@aws-cdk/pipelines',
    '@aws-cdk/aws-lambda-nodejs',
    '@aws-cdk/aws-appsync',
    '@aws-cdk/pipelines',
    '@aws-cdk/aws-dynamodb',
    '@aws-cdk/aws-cognito',
  ],
  deps: ['aws-cdk-staging-pipeline', 'cdk-appsync-transformer'],
  context: {
    '@aws-cdk/core:enableStackNameDuplicates': true,
    'aws-cdk:enableDiffNoFail': true,
    '@aws-cdk/core:stackRelativeExports': true,
    '@aws-cdk/core:newStyleStackSynthesis': true,
  },
  releaseWorkflow: false,
});

project.buildTask.prependExec(
  'cd frontend && yarn install && yarn build && cd ..',
);

project.setScript('cdkDeploy', 'cdk deploy');
project.setScript('cdkDestroy', 'cdk destroy');

const common_exclude = ['appsync'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();

const frontendProject = new web.ReactTypeScriptProject({
  defaultReleaseBranch: 'main',
  outdir: 'frontend',
  parent: project,
  name: 'aws-cdk-todolist-ui-frontend',
  deps: [
    '@aws-amplify/auth',
    '@aws-amplify/ui-components',
    '@aws-amplify/ui-react',
    'aws-amplify',
    'react-query@^2',
    'react-router',
    'react-router-dom',
    '@types/react-router-dom',
    'react-datetime-picker',
  ],
  devDeps: [
    '@graphql-codegen/cli',
    '@graphql-codegen/typescript',
    '@graphql-codegen/typescript-operations',
    '@graphql-codegen/typescript-react-query@alpha',
    'amplify-graphql-docs-generator',
    'aws-sdk@^2',
    'graphql',
  ],
  tsconfig: {
    compilerOptions: {
      forceConsistentCasingInFileNames: false,
      strictNullChecks: false,
    },
  },

  releaseWorkflow: false,
});

frontendProject.addTask('dev', {
  description: 'Runs the application locally',
  exec: 'react-scripts start',
});

frontendProject.addTask('debug', {
  description: 'Runs the application locally',
  exec: 'react-scripts debug',
});

frontendProject.addTask('generate-exports', {
  description: 'Generates aws-exports.js',
  exec: 'node bin/generateExports.js dev && node bin/generateExports.js prod && cp src/config/dev/config.js public/config.js',
});

frontendProject.addTask('copy-schema', {
  exec: 'cp ../appsync/schema.graphql ./schema.graphql',
});

frontendProject.addTask('generate-statements', {
  exec: 'node bin/generateStatements.js',
});

frontendProject.addTask('codegen', {
  description: 'Generates frontend GraphQL wrapper API code',
  exec: 'yarn run copy-schema && yarn run generate-statements && graphql-codegen --config codegen.yml && rm schema.graphql',
});

frontendProject.synth();
