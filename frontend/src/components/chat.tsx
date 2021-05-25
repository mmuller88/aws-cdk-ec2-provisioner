import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';

import { css } from 'glamor'

import { CreateMessageDocument, CreateMessageInput, Message, useListMessagesQuery} from '../lib/api';
import { API as FAPI} from '../lib/fetcher';
import { onCreateMessage } from '../graphql/subscriptions';

import Observable from 'zen-observable';

const initialState = { content: '' }

interface ChatProps {
  username: string;
}

export function Chat({username}:ChatProps) {

  // console.log('username:'+username);

  const [message, setMessage] = useState(initialState);

  useEffect(() => {
    scrollToBottom()
  }, []);

  const { data, isLoading, refetch } = useListMessagesQuery(null, {
    refetchOnWindowFocus: false,
  });
  
  //const messages = data?.listMessages.items;
  data?.listMessages?.items.sort((m1,m2) => new Date(m1.createdAt).getTime() - new Date(m2.createdAt).getTime());
  // if (messagess?.length === 0) setMessagess(messages);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  // const el = useRef(null);
  // if(el !== null){
  //   el.current?.scrollIntoView({ behavior: 'smooth' });
  // }

  // useEffect(() => {

  //     if (el.current === null) { }
  //     else
  //         el!.current!.scrollIntoView({ behavior: 'smooth' });
  // }, [])

  const onChange = e => {
    setMessage({ ...message, [e.target.name]: e.target.value })
  }

  const [useCreateMessageMutation] = useMutation(async (input: CreateMessageInput) => {
    const result = await FAPI.getInstance().query(CreateMessageDocument, { input });
    
    const subs = await FAPI.getInstance().query(onCreateMessage) as Observable<CreateMessageInput>;
    subs.subscribe({
      next: async (message) => {
        console.log("Subscription fires 2");
        console.log(message);
        await refetch();
        // setMessagess(['doint']);
      },
      error: error => console.warn(error)
    });
    
    return result.data?.createMessage as Message;
  });

  const createMessage = async (e) => {
    if (e.key !== 'Enter') {
      return
    }
    if (message.content === '') return
    // console.log('u'+username);

    const messageInput: CreateMessageInput = {
      // id: uuid(),
      createdAt: new Date().toISOString(),
      content: message.content,
      authorId: username,
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const createResult = await useCreateMessageMutation(messageInput, { onSuccess: (data) => { console.log(data) } });
    if (createResult) {
      await refetch();
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
          data?.listMessages.items?.map((m, i) => {
            return (
              <div key={i} {...css([styles.message, checkSenderForMessageStyle(username, m)])}>
                <p {...css([styles.messageText, checkSenderForTextStyle(username, m)])}>{`${m.authorId === username ? 'me' : m.authorId}: ${m.content}`}</p>
              </div>
            )
          })
        }
        <div ref={messagesEndRef} {...css(styles.scroller)} />
      </div>
      <div {...css(styles.inputContainer)}>
        <input
          {...css(styles.input)}
          placeholder='Message'
          name='content'
          onChange={onChange}
          onKeyPress={createMessage}
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