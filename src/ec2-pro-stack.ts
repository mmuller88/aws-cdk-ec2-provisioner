import * as core from '@aws-cdk/core';
import { CustomStack } from 'aws-cdk-staging-pipeline/lib/custom-stack';
import { AppSyncStack } from './appsync-stack';
import { StaticSite } from './static-site';


export interface Ec2ProStackProps extends core.StackProps {
  readonly stage: string;
}

export class Ec2ProStack extends CustomStack {
  constructor(scope: core.Construct, id: string, props: Ec2ProStackProps) {
    super(scope, id, props);

    const appsync = new AppSyncStack(scope, `ec2-provisioner-stack-${props.stage}`, {
      stackName: `ec2-provisioner-stack-${props.stage}`,
      stage: props.stage,
    });

    const staticsite = new StaticSite(scope, `ec2-provisioner-ui-stack-${props.stage}`, {
      stackName: `ec2-provisioner-ui-stack-${props.stage}`,
      stage: props.stage,
    });

    this.cfnOutputs = { ...appsync.cfnOutputs, ...staticsite.cfnOutputs };

  }
}
