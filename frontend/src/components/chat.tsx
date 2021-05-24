import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';

import { css } from 'glamor'

import { CreateMessageDocument, CreateMessageInput, Message, useListMessagesQuery, OnCreateMessageSubscription} from '../lib/api';
import { API as FAPI} from '../lib/fetcher';
import { useSubscription } from './subscriber';
import { onCreateMessage } from '../graphql/subscriptions';
import { API, graphqlOperation } from 'aws-amplify';

import * as subscriptions from './../graphql/subscriptions';


// react-apollo compose has no type export
// https://dev.to/piglovesyou/react-apollo-codegen-typescript-how-you-can-compose-multiple-queries-mutations-to-a-component-2jic
export declare function compose(...funcs: Function[]): (...args: any[]) => any;

const initialState = { content: '' }

interface ChatProps {
  username: string;
}

export function Chat({username}:ChatProps) {

  // console.log('username:'+username);

  const [message, setMessage] = useState(initialState);

  const { content } = message;

  const { data, isLoading, refetch } = useListMessagesQuery(null, {
    refetchOnWindowFocus: false,
  });
  
  const messages = data?.listMessages.items;
  messages?.sort((m1,m2) => new Date(m1.createdAt).getTime() - new Date(m2.createdAt).getTime());

  const [item] = useSubscription({
    config: {
      key: 'onCreateMessageById',
      query: onCreateMessage,
    },
  });

  // Subscribe to creation of Todo
const subscription = API.graphql(
  graphqlOperation(subscriptions.addedMessage)
).subscribe({
  next: ({ provider, value }) => {
    console.log("Subscription fires")
    console.log({ provider, value })},
  error: error => console.warn(error)
});

const subscription2 = API.graphql(
  graphqlOperation(subscriptions.onCreateMessage)
).subscribe({
  next: ({ provider, value }) => {
    console.log("Subscription fires 2")
    console.log({ provider, value })},
  error: error => console.warn(error)
});

  console.log('item: '+item);

  // const el = useRef<null | HTMLDivElement>(null); 

  // componentDidMount() {
  
  //   this.props.subscribeToNewMessages()
  // }
  // const scrollToBottom = () => {
  //   el.current.scrollIntoView({ behavior: "smooth" });
  // }
  // scrollToBottom();

  const el = useRef(null);

  useEffect(() => {
      if (el.current === null) { }
      else
          el!.current!.scrollIntoView({ behavior: 'smooth' });
  }, [])

  const onChange = e => {
    setMessage({ ...message, [e.target.name]: e.target.value })
  }

  const [useCreateMessageMutation] = useMutation(async (input: CreateMessageInput) => {
    const result = await FAPI.getInstance().query(CreateMessageDocument, { input });
    return result.data?.createMessage as Message;
  });

  const createMessage = async (e) => {
    if (e.key !== 'Enter') {
      return
    }
    if (content === '') return
    // console.log('u'+username);

    const message: CreateMessageInput = {
      // id: uuid(),
      createdAt: new Date().toISOString(),
      content: content,
      authorId: username,
    }

    const input = {
      ...message,
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const createResult = await useCreateMessageMutation(input, { onSuccess: (data) => { console.log(data) } });
    if (createResult) {
      refetch();
    }
    setMessage({ content: '' })
  }
  // const { username } = UserStore;

  return (
    <div>
      <div {...css(styles.conversationNameContainer)}>
        <p {...css(styles.conversationName)}>Chat</p>
      </div>
      <div {...css(styles.messagesContainer)}>
        {
          messages?.map((m, i) => {
            return (
              <div key={i} {...css([styles.message, checkSenderForMessageStyle(username, m)])}>
                <p {...css([styles.messageText, checkSenderForTextStyle(username, m)])}>{`${m.authorId === username ? 'me' : m.authorId}: ${m.content}`}</p>
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
          name='content'
          onChange={onChange}
          onKeyPress={createMessage}
          // value={content}
        />
      </div>
    </div>
  )

  
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