/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listTodos = /* GraphQL */ `
  query ListTodos {
    listTodos {
      id
      userId
      title
      completed
    }
  }
`;
export const getHistoryEntry = /* GraphQL */ `
  query GetHistoryEntry($id: ID!) {
    getHistoryEntry(id: $id) {
      id
      ec2ConfigId
      comment
      time
      createdAt
      updatedAt
    }
  }
`;
export const listHistoryEntrys = /* GraphQL */ `
  query ListHistoryEntrys(
    $filter: ModelHistoryEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHistoryEntrys(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getEc2Config = /* GraphQL */ `
  query GetEc2Config($id: ID!) {
    getEc2Config(id: $id) {
      id
      startDate
      stopDate
      username
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
export const listEc2Configs = /* GraphQL */ `
  query ListEc2Configs(
    $filter: ModelEc2ConfigFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEc2Configs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        startDate
        stopDate
        username
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
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        username
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      authorId
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        authorId
        content
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($params: QueryGetTodoParamsInput!) {
    getTodo(params: $params) {
      id
      userId
      title
      completed
    }
  }
`;
