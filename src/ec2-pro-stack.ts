import * as core from '@aws-cdk/core';
import { CustomStack } from 'aws-cdk-staging-pipeline/lib/custom-stack';
import { AppSyncStack } from './appsync-stack';
// import { SchedulerStack } from './scheduler-stack';
import { StaticSite } from './static-site';


export interface Ec2ProStackProps extends core.StackProps {
  readonly stage: string;
  readonly userPoolId?: string;
}

export class Ec2ProStack extends CustomStack {
  constructor(scope: core.Construct, id: string, props: Ec2ProStackProps) {
    super(scope, id, props);

    const appsync = new AppSyncStack(scope, `ec2-provisioner-stack-${props.stage}`, {
      stackName: `ec2-provisioner-stack-${props.stage}`,
      stage: props.stage,
      userPoolId: props.userPoolId,
    });

    const staticsite = new StaticSite(scope, `ec2-provisioner-ui-stack-${props.stage}`, {
      stackName: `ec2-provisioner-ui-stack-${props.stage}`,
      stage: props.stage,
    });

    // const scheduler = new SchedulerStack(scope, `ec2-pro-scheduler-stack-${props.stage}`, {
    //   stackName: `ec2-pro-scheduler-stack-${props.stage}`,
    //   stage: props.stage,
    //   appSyncTransformer: appsync.appSyncTransformer,
    // });

    this.cfnOutputs = { ...appsync.cfnOutputs, ...staticsite.cfnOutputs /*, ...scheduler.cfnOutputs*/ };

  }
}
