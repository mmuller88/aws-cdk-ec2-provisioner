const { web, AwsCdkTypeScriptApp, NodePackageManager, NodeProject } = require('projen');

const deps = [
  '@types/aws-lambda',
  'aws-lambda',
  'aws-sdk',
  'esbuild@^0',
  'aws-cdk-staging-pipeline',
  'cdk-appsync-transformer',
  '@types/deep-diff',
  'cdk-iam-floyd',
  'cdk-ec2-key-pair',
  'axios',
];

const project = new AwsCdkTypeScriptApp({
  authorAddress: 'damadden88@googlemail.com',
  authorName: 'martin.mueller',
  name: 'aws-cdk-ec2-provisioner',
  // packageManager: NodePackageManager.NPM,
  defaultReleaseBranch: 'main',
  cdkVersion: '1.107.0',
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
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-logs',
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-cloudwatch',
    '@aws-cdk/aws-cloudwatch-actions',
    '@aws-cdk/aws-sns',
    '@aws-cdk/aws-sqs',
    '@aws-cdk/aws-lambda-event-sources',
  ],
  deps,
  devDeps: deps,
  // bundledDeps: deps,
  // peerDeps: deps,
  context: {
    '@aws-cdk/core:enableStackNameDuplicates': true,
    'aws-cdk:enableDiffNoFail': true,
    '@aws-cdk/core:stackRelativeExports': true,
    '@aws-cdk/core:newStyleStackSynthesis': true,
  },
  tsconfig: {
    compilerOptions: {
      rootDir: undefined,
    },
  },
  releaseWorkflow: false,
});

project.buildTask.prependExec(
  'cd frontend && yarn install && yarn build && cd ..',
);

project.setScript('cdkDeploy', 'cdk deploy');
project.setScript('cdkDestroy', 'cdk destroy');
project.setScript('cdk', 'cdk');

// project.setScript('cdkDeployEc2', 'cdk deploy --app "npx ts-node src/ec2/main.ts"');
// project.setScript('cdkDestroyEc2', 'cdk destroy --app "npx ts-node src/ec2/main.ts"');

project.addTask('updateSchema', {
  description: 'Udates all places when changing the schema.graphql',
  exec: 'yarn synth && cd frontend && yarn codegen && cd ..',
});

project.setScript('dev', 'cd frontend && yarn dev');

const common_exclude = ['appsync', 'frontend/build'];
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
    'react-datetime',
    'glamor',
    'mobx-react',
    'mobx',
    'react-icons',
    'react-apollo',
    // 'uuidv4',
    'zen-observable-ts',
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
