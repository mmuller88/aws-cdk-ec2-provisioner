/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createHistoryEntry = /* GraphQL */ `
  mutation CreateHistoryEntry($input: CreateHistoryEntryInput!) {
    createHistoryEntry(input: $input) {
      id
      ec2ConfigId
      comment
      time
      createdAt
      updatedAt
    }
  }
`;
export const updateHistoryEntry = /* GraphQL */ `
  mutation UpdateHistoryEntry($input: UpdateHistoryEntryInput!) {
    updateHistoryEntry(input: $input) {
      id
      ec2ConfigId
      comment
      time
      createdAt
      updatedAt
    }
  }
`;
export const deleteHistoryEntry = /* GraphQL */ `
  mutation DeleteHistoryEntry($input: DeleteHistoryEntryInput!) {
    deleteHistoryEntry(input: $input) {
      id
      ec2ConfigId
      comment
      time
      createdAt
      updatedAt
    }
  }
`;
export const createEc2Config = /* GraphQL */ `
  mutation CreateEc2Config($input: CreateEc2ConfigInput!) {
    createEc2Config(input: $input) {
      id
      userId
      vmType
      history {
        items {
          id
          ec2ConfigId
          comment
          time
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateEc2Config = /* GraphQL */ `
  mutation UpdateEc2Config($input: UpdateEc2ConfigInput!) {
    updateEc2Config(input: $input) {
      id
      userId
      vmType
      history {
        items {
          id
          ec2ConfigId
          comment
          time
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteEc2Config = /* GraphQL */ `
  mutation DeleteEc2Config($input: DeleteEc2ConfigInput!) {
    deleteEc2Config(input: $input) {
      id
      userId
      vmType
      history {
        items {
          id
          ec2ConfigId
          comment
          time
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      content
      username
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(input: $input) {
      id
      title
      content
      username
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost($input: DeletePostInput!) {
    deletePost(input: $input) {
      id
      title
      content
      username
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      id
      authorId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage($input: UpdateMessageInput!) {
    updateMessage(input: $input) {
      id
      authorId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage($input: DeleteMessageInput!) {
    deleteMessage(input: $input) {
      id
      authorId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
