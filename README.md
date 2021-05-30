# aws-cdk-ec2-provisioner

AWS Amplify frontend for the appsync backend [aws-cdk-todolist](https://github.com/mmuller88/aws-cdk-todolist)

# Deploy Frontend CDK Stack

The Frontend AWS CDK Stack is an AWS S3 Static Side bucket. It is managed by my [AWS CDK Staging Pipeline Custom Construct](https://github.com/mmuller88/aws-cdk-staging-pipeline). See specifics in src/main.ts

1. Deploy

```bash
yarn deploy
```

```bash
yarn destroy
```

# Build / Run Frontend

cd frontend

1. Generate Exports && GraphQL Types

```
yarn generate-exports
yarn codegen
```

1. Run the frontend locally

```bash
yarn dev
```

# Connect to VM:

1) Download key and save as vm.pem
2) connect with terminal using vm.pem and public dns name like:
```
ssh -i "vm.pem" ec2-3-126-251-42.eu-central-1.compute.amazonaws.com 
```

# Misc

yes | yarn cdkDestroy '_' && yarn cdkDeploy '_' --require-approval never

- https://github.com/amazon-archives/aws-appsync-chat

# Thanks to:

- kcwinner for this very inspiring TS React Amplify project https://github.com/kcwinner/cdk-appsync-react-demo
