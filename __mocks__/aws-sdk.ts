import * as AWS from 'aws-sdk';

export const describeInstancesResponse = jest.fn().mockReturnValue(Promise.resolve(true));
const describeInstancesFn = jest.fn().mockImplementation(() => ({ promise: describeInstancesResponse }));

export class EC2 {

  public describeInstances: jest.Mock<any, any>;

  constructor() {
    this.describeInstances = describeInstancesFn;
  }
}

export const createStackResponse = jest.fn().mockReturnValue(Promise.resolve(true));
const createStackFn = jest.fn().mockImplementation(() => ({ promise: createStackResponse }));
export const updateStackResponse = jest.fn().mockReturnValue(Promise.resolve(true));
const updateStackFn = jest.fn().mockImplementation(() => ({ promise: updateStackResponse }));
export const waitForResponse = jest.fn().mockReturnValue(Promise.resolve(true));
const waitForFn = jest.fn().mockImplementation(() => ({ promise: waitForResponse }));
export class CloudFormation {

  public createStack: jest.Mock<any, any>;
  public updateStack: jest.Mock<any, any>;
  public waitFor: jest.Mock<any, any>;

  constructor() {
    this.createStack = createStackFn;
    this.updateStack = updateStackFn;
    this.waitFor = waitForFn;
  }
}

export class DynamoDB extends AWS.DynamoDB {

}