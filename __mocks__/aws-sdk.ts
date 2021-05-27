export const describeInstancesResponse = jest.fn().mockReturnValue(Promise.resolve(true));

const describeInstancesFn = jest.fn().mockImplementation(() => ({ promise: describeInstancesResponse }));

export class EC2 {

  public describeInstances: jest.Mock<any, any>;

  constructor() {
    this.describeInstances = describeInstancesFn;
  }

}
