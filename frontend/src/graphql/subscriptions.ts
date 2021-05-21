/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateConvoLink = /* GraphQL */ `
  subscription OnCreateConvoLink($convoLinkUserId: ID!) {
    onCreateConvoLink(convoLinkUserId: $convoLinkUserId) {
      id
      user {
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
      convoLinkUserId
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
      convoLinkConversationId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($messageConversationId: ID!) {
    onCreateMessage(messageConversationId: $messageConversationId) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateConversation = /* GraphQL */ `
  subscription OnCreateConversation($members: String!) {
    onCreateConversation(members: $members) {
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
export const onUpdateConversation = /* GraphQL */ `
  subscription OnUpdateConversation($members: String!) {
    onUpdateConversation(members: $members) {
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
export const onDeleteConversation = /* GraphQL */ `
  subscription OnDeleteConversation($members: String!) {
    onDeleteConversation(members: $members) {
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
export const onCreateEc2Config = /* GraphQL */ `
  subscription OnCreateEc2Config($owner: String) {
    onCreateEc2Config(owner: $owner) {
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
export const onUpdateEc2Config = /* GraphQL */ `
  subscription OnUpdateEc2Config($owner: String) {
    onUpdateEc2Config(owner: $owner) {
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
export const onDeleteEc2Config = /* GraphQL */ `
  subscription OnDeleteEc2Config($owner: String) {
    onDeleteEc2Config(owner: $owner) {
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
