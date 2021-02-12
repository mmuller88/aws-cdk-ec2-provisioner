const { web, AwsCdkTypeScriptApp } = require('projen');

const project = new AwsCdkTypeScriptApp({
  name: 'aws-cdk-todolist-ui',
  defaultReleaseBranch: 'main',
  cdkVersion: '1.88.0',
  cdkDependencies: [
    '@aws-cdk/aws-iam',
    '@aws-cdk/core',
  ],
  deps: [
    '@mobileposse/auto-delete-bucket',
    'aws-cdk-staging-pipeline',
    'aws-cdk-build-badge',
    // 'cdk-appsync-transformer',
  ],

  gitignore: [
    // 'appsync/',
  ],

  releaseWorkflow: false,
});

project.synth();

const frontendProject = new web.ReactTypeScriptProject({
  authorAddress: 'damadden88@googlemail.de',
  authorName: 'martin.mueller',
  defaultReleaseBranch: 'main',
  outdir: 'frontend',
  parent: project,
  // jsiiFqn: "projen.web.ReactTypeScriptProject",
  name: 'aws-cdk-todolist-ui-frontend',
  deps: [
    '@aws-amplify/auth',
    '@aws-amplify/ui-components',
    '@aws-amplify/ui-react',
    'aws-amplify',
    'react-query@^2', // I have an open PR for react-query v3 support
    'react-router',
    'react-router-dom',
    '@types/react-router-dom',
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

  gitignore: [
    'aws-exports.js',
  ],

  tsconfig: {
    compilerOptions: {
      allowJs: true,
      skipLibCheck: true,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
      forceConsistentCasingInFileNames: false,
      module: 'esnext',
      moduleResolution: 'node',
      isolatedModules: true,
      noEmit: true,
      jsx: 'react-jsx',
      strictNullChecks: false,
    },
  },

  releaseWorkflow: false,
});

frontendProject.addTask('dev', {
  description: 'Runs the application locally',
  exec: 'react-scripts start',
});

frontendProject.addTask('generate-exports', {
  description: 'Generates aws-exports.js',
  exec: 'node bin/generateExports.js',
});

// project.addTask('copy-schema', {
//   exec: 'cp appsync/schema.graphql ./schema.graphql',
// });

frontendProject.addTask('generate-statements', {
  exec: 'node bin/generateStatements.js',
});


frontendProject.addTask('codegen', {
  description: 'Copies the backend schema and generates frontend code',
  // exec: 'yarn run copy-schema && yarn run generate-statements && graphql-codegen --config codegen.yml && rm schema.graphql',
  exec: 'yarn run generate-statements && graphql-codegen --config codegen.yml',
});

frontendProject.synth();