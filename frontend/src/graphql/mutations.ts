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
export const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
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
export const createConvo = /* GraphQL */ `
  mutation CreateConvo($input: CreateConversationInput!) {
    createConvo(input: $input) {
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
export const createMessage = /* GraphQL */ `
  mutation CreateMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage($input: UpdateMessageInput!) {
    updateMessage(input: $input) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage($input: DeleteMessageInput!) {
    deleteMessage(input: $input) {
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
export const createConvoLink = /* GraphQL */ `
  mutation CreateConvoLink($input: CreateConvoLinkInput!) {
    createConvoLink(input: $input) {
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
export const updateConvoLink = /* GraphQL */ `
  mutation UpdateConvoLink($input: UpdateConvoLinkInput!) {
    updateConvoLink(input: $input) {
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
export const createEc2Config = /* GraphQL */ `
  mutation CreateEc2Config($input: CreateEc2ConfigInput!) {
    createEc2Config(input: $input) {
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
export const updateEc2Config = /* GraphQL */ `
  mutation UpdateEc2Config($input: UpdateEc2ConfigInput!) {
    updateEc2Config(input: $input) {
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
export const deleteEc2Config = /* GraphQL */ `
  mutation DeleteEc2Config($input: DeleteEc2ConfigInput!) {
    deleteEc2Config(input: $input) {
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
