import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps
} from "react-router-dom";

import React from 'react'

import { graphql } from 'react-apollo'
import { observer } from 'mobx-react'
import { css } from 'glamor'
import { uuid } from 'uuidv4'

import UserStore from '../mobx/UserStore'
// import { getConvo, createMessage as CreateMessage, onCreateMessage as OnCreateMessage } from '../graphql'
import { Message, useGetConversationQuery, useListConversationsQuery} from '../lib/api';

import { Auth } from '@aws-amplify/auth';

// react-apollo compose has no type export
// https://dev.to/piglovesyou/react-apollo-codegen-typescript-how-you-can-compose-multiple-queries-mutations-to-a-component-2jic
export declare function compose(...funcs: Function[]): (...args: any[]) => any;

interface ConversationProps {
  conversationId: string;
  conversationName: string;
}

export function Conversation( { match }: RouteComponentProps<ConversationProps>) {
  const state = {
    message: ''
  }

  const { conversationId } = match.params;
  const { conversationName } = match.params

  console.log(`conversationId: ${conversationId}, conversationName: ${conversationName}`);

  const conversation = useGetConversationQuery({ id: conversationId }, {
    refetchOnWindowFocus: false,
  }).data?.getConversation;

  // const { data, isLoading, refetch } = useListConversationsQuery(null, {
  //   refetchOnWindowFocus: false
  // });

  // console.log(`conversation: ${conversation}`)
  console.log(`data: ${JSON.stringify(conversation)}`)
    const { username } = UserStore
    // let { messages } = this.props
  // const messages = conversation.messages.items.sort((a, b) => a.createdAt - b.createdAt)
  const messages = conversation?.messages.items;

    return (
      <div>
        <div {...css(styles.conversationNameContainer)}>
          <p {...css(styles.conversationName)}>{conversationName}</p>
        </div>
        <div {...css(styles.messagesContainer)}>
          {
            messages?.map((m, i) => {
              return (
                <div key={i} {...css([styles.message, checkSenderForMessageStyle(username, m)])}>
                  <p {...css([styles.messageText, checkSenderForTextStyle(username, m)])}>{m.content}</p>
                </div>
              )
            })
          }
          {/* <div ref={val => this.div = val} {...css(styles.scroller)} /> */}
        </div>
        <div {...css(styles.inputContainer)}>
          <input
            {...css(styles.input)}
            placeholder='Message'
            name='message'
            // onChange={this.onChange}
            // onKeyPress={this.createMessage}
            // value={this.state.message}
          />
        </div>
      </div>
    )

  // componentDidMount() {
  //   this.scrollToBottom()
  //   this.props.subscribeToNewMessages()
  // }
  // scrollToBottom = () => {
  //   this.div.scrollIntoView({ behavior: "smooth" });
  // }
  // onChange = e => {
  //   this.setState({ [e.target.name]: e.target.value })
  // }
  // createMessage = async (e) => {
  //   if (e.key !== 'Enter') {
  //     return
  //   }
  //   if (this.state.message === '') return
  //   const userData = await Auth.currentAuthenticatedUser();
  //   const { username } = userData.username // UserStore
  //   const  { conversationId } = this.props.match.params
  //   const message = {
  //     id: uuid(),
  //     createdAt: Date.now(),
  //     messageConversationId: conversationId,
  //     content: this.state.message,
  //     authorId: username
  //   }
  //   this.props.createMessage(message)
  //   this.setState({ message: '' })
  // }
}

function checkSenderForMessageStyle(username: string, message: Message) {
  if (username === message.authorId) {
    return {
      backgroundColor: '#1b86ff',
      marginLeft: 50
    }
  } else {
    return { marginRight: 50 }
  }
}

function checkSenderForTextStyle(username: string, message: Message) {
  if (username === message.authorId) {
    return {
      color: 'white'
    }
  }
  return null;
}

const styles = {
  conversationNameContainer: {
    backgroundColor: '#fafafa',
    padding: 20,
    borderBottom: '1px solid #ddd'
  },
  conversationName: {
    margin: 0,
    fontSize: 16,
    fontWeight: 500
  },
  scroller: {
    float:"left", clear: "both"
  },
  messagesContainer: {
    height: 'calc(100vh - 219px)',
    overflow: 'scroll',   
  },
  message: {
    backgroundColor: "#ededed",
    borderRadius: 10,
    margin: 10,
    padding: 20
  },
  messageText: {
    margin: 0
  },
  input: {
    height: 45,
    outline: 'none',
    border: '2px solid #ededed',
    margin: 5,
    borderRadius: 30,
    padding: '0px 20px',
    fontSize: 18,
    width: 'calc(100% - 54px)'
  },
  inputContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 50,
    left: 0,
  }
}

// const ConversationWithData = compose(
//   graphql(getConvo, {
//     options: props => {
//       const { conversationId } = props.match.params
//       return {
//         variables: {
//           id: conversationId
//         },
//         fetchPolicy: 'cache-and-network'
//       }
//     },
//     props: props => {
//       const { conversationId } = props.ownProps.match.params
//       let messages = props.data.getConvo ?
//       props.data.getConvo.messages.items
//       : []
//       return {
//         messages,
//         data: props.data,
//         subscribeToNewMessages: params => {
//           props.data.subscribeToMore({
//             document: OnCreateMessage,
//             variables: { messageConversationId: conversationId },
//             updateQuery: (prev, { subscriptionData: { data : { onCreateMessage } } }) => {
    
//               let messageArray = prev.getConvo.messages.items.filter(message => message.id !== onCreateMessage.id)
//               messageArray = [
//                 ...messageArray,
//                 onCreateMessage,
//               ]

//               return {
//                 ...prev,
//                 getConvo: {
//                   ...prev.getConvo,
//                   messages: {
//                     ...prev.getConvo.messages,
//                     items: messageArray
//                   }
//                 }
//               }
//             }
//           })
//         },
//       }
//     }
//   }),
//   graphql(CreateMessage, {
//     options: (props) => {
//       const { conversationId } = props.match.params
//       return {
//         update: (dataProxy, { data: { createMessage } }) => {

//           const query = getConvo
//           const data = dataProxy.readQuery({ query, variables: { id: conversationId } })
          
//           data.getConvo.messages.items = data.getConvo.messages.items.filter(m => m.id !== createMessage.id)
          
//           data.getConvo.messages.items.push(createMessage)

//           dataProxy.writeQuery({ query, data, variables: { id: conversationId } })
//         }
//       }
//     },
//     props: (props) => ({
//       createMessage: message => {
//         props.mutate({
//           variables: message,
//           optimisticResponse: {
//             createMessage: { ...message, __typename: 'Message' }
//           }
//         })
//       }
//     }),
//   }),
//   // graphqlMutation(createMessage, getConvo, 'Message')
// )(Conversation)

// export default observer(ConversationWithData)