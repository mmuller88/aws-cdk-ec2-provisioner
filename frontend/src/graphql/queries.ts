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
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      conversations {
        items {
          id
          user {
            id
            username
            conversations {
              nextToken
            }
            messages {
              nextToken
            }
            createdAt
            updatedAt
          }
          convoLinkUserId
          conversation {
            id
            messages {
              nextToken
            }
            associated {
              nextToken
            }
            name
            members
            createdAt
            updatedAt
          }
          convoLinkConversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          author {
            id
            username
            conversations {
              nextToken
            }
            messages {
              nextToken
            }
            createdAt
            updatedAt
          }
          authorId
          content
          conversation {
            id
            messages {
              nextToken
            }
            associated {
              nextToken
            }
            name
            members
            createdAt
            updatedAt
          }
          messageConversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        conversations {
          items {
            id
            user {
              id
              username
              createdAt
              updatedAt
            }
            convoLinkUserId
            conversation {
              id
              name
              members
              createdAt
              updatedAt
            }
            convoLinkConversationId
            createdAt
            updatedAt
          }
          nextToken
        }
        messages {
          items {
            id
            author {
              id
              username
              createdAt
              updatedAt
            }
            authorId
            content
            conversation {
              id
              name
              members
              createdAt
              updatedAt
            }
            messageConversationId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getConversation = /* GraphQL */ `
  query GetConversation($id: ID!) {
    getConversation(id: $id) {
      id
      messages {
        items {
          id
          author {
            id
            username
            conversations {
              nextToken
            }
            messages {
              nextToken
            }
            createdAt
            updatedAt
          }
          authorId
          content
          conversation {
            id
            messages {
              nextToken
            }
            associated {
              nextToken
            }
            name
            members
            createdAt
            updatedAt
          }
          messageConversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      associated {
        items {
          id
          user {
            id
            username
            conversations {
              nextToken
            }
            messages {
              nextToken
            }
            createdAt
            updatedAt
          }
          convoLinkUserId
          conversation {
            id
            messages {
              nextToken
            }
            associated {
              nextToken
            }
            name
            members
            createdAt
            updatedAt
          }
          convoLinkConversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      name
      members
      createdAt
      updatedAt
    }
  }
`;
export const listConversations = /* GraphQL */ `
  query ListConversations(
    $filter: ModelConversationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConversations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        messages {
          items {
            id
            author {
              id
              username
              createdAt
              updatedAt
            }
            authorId
            content
            conversation {
              id
              name
              members
              createdAt
              updatedAt
            }
            messageConversationId
            createdAt
            updatedAt
          }
          nextToken
        }
        associated {
          items {
            id
            user {
              id
              username
              createdAt
              updatedAt
            }
            convoLinkUserId
            conversation {
              id
              name
              members
              createdAt
              updatedAt
            }
            convoLinkConversationId
            createdAt
            updatedAt
          }
          nextToken
        }
        name
        members
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      author {
        id
        username
        conversations {
          items {
            id
            user {
              id
              username
              createdAt
              updatedAt
            }
            convoLinkUserId
            conversation {
              id
              name
              members
              createdAt
              updatedAt
            }
            convoLinkConversationId
            createdAt
            updatedAt
          }
          nextToken
        }
        messages {
          items {
            id
            author {
              id
              username
              createdAt
              updatedAt
            }
            authorId
            content
            conversation {
              id
              name
              members
              createdAt
              updatedAt
            }
            messageConversationId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      authorId
      content
      conversation {
        id
        messages {
          items {
            id
            author {
              id
              username
              createdAt
              updatedAt
            }
            authorId
            content
            conversation {
              id
              name
              members
              createdAt
              updatedAt
            }
            messageConversationId
            createdAt
            updatedAt
          }
          nextToken
        }
        associated {
          items {
            id
            user {
              id
              username
              createdAt
              updatedAt
            }
            convoLinkUserId
            conversation {
              id
              name
              members
              createdAt
              updatedAt
            }
            convoLinkConversationId
            createdAt
            updatedAt
          }
          nextToken
        }
        name
        members
        createdAt
        updatedAt
      }
      messageConversationId
      createdAt
      updatedAt
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
        author {
          id
          username
          conversations {
            items {
              id
              convoLinkUserId
              convoLinkConversationId
              createdAt
              updatedAt
            }
            nextToken
          }
          messages {
            items {
              id
              authorId
              content
              messageConversationId
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        authorId
        content
        conversation {
          id
          messages {
            items {
              id
              authorId
              content
              messageConversationId
              createdAt
              updatedAt
            }
            nextToken
          }
          associated {
            items {
              id
              convoLinkUserId
              convoLinkConversationId
              createdAt
              updatedAt
            }
            nextToken
          }
          name
          members
          createdAt
          updatedAt
        }
        messageConversationId
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
