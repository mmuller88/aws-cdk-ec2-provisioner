/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateHistoryEntry = /* GraphQL */ `
  subscription OnCreateHistoryEntry {
    onCreateHistoryEntry {
      id
      ec2ConfigId
      comment
      time
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHistoryEntry = /* GraphQL */ `
  subscription OnUpdateHistoryEntry {
    onUpdateHistoryEntry {
      id
      ec2ConfigId
      comment
      time
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHistoryEntry = /* GraphQL */ `
  subscription OnDeleteHistoryEntry {
    onDeleteHistoryEntry {
      id
      ec2ConfigId
      comment
      time
      createdAt
      updatedAt
    }
  }
`;
export const onCreateEc2Config = /* GraphQL */ `
  subscription OnCreateEc2Config {
    onCreateEc2Config {
      id
      startDate
      stopDate
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
export const onUpdateEc2Config = /* GraphQL */ `
  subscription OnUpdateEc2Config {
    onUpdateEc2Config {
      id
      startDate
      stopDate
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
export const onDeleteEc2Config = /* GraphQL */ `
  subscription OnDeleteEc2Config {
    onDeleteEc2Config {
      id
      startDate
      stopDate
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($owner: String) {
    onCreatePost(owner: $owner) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($owner: String) {
    onUpdatePost(owner: $owner) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($owner: String) {
    onDeletePost(owner: $owner) {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
      id
      authorId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      authorId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
      id
      authorId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
