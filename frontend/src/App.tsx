import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import { AuthState, onAuthUIStateChange, } from '@aws-amplify/ui-components';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';


import { API } from './lib/fetcher';

import Amplify, { Auth } from 'aws-amplify';

import { Posts } from './components/posts';
import { Todos } from './components/todos';
import { Configs } from './components/configs';
import { Chat } from './components/chat';

declare const window: any;

Amplify.configure(window.ENV);
Auth.configure(window.ENV);

function App() {

  const [username, setUsername] = useState('nope');

  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData: any) => {
      setUsername(authData?.username);
      setUsername(authData?.username);
      API.updateIsSignedIn(nextAuthState === AuthState.SignedIn);
    });
    return onAuthUIStateChange((nextAuthState, authData: any) => {
      setUsername(authData?.username);
      setUsername(authData?.username);
      API.updateIsSignedIn(nextAuthState === AuthState.SignedIn);
    });
  }, []);

  return (
    <div className="App">
      <nav className="Navbar">
        <h1 className="navbar-logo">Hacklab Demo</h1>
        <ul className="nav-menu">
          <li> <a href="/chat">Chat</a></li>
          <li> <a href="/configs">Configs</a></li>
          <li> <a href="/posts">Posts</a></li>
          <li> <a href="/todos">Todos</a></li>
        </ul>
        <div>
          <span>signed in: {username}</span>
          <AmplifySignOut button-text="Logout"></AmplifySignOut>
        </div>
      </nav>
      <div>
        <Router>
          <Switch>
            <Route exact path="/" render={(props: any) => <Configs {...props}  />} />
            <Route path="/chat" render={(props: any) => <Chat username={username} {...props}  />} />
            <Route path="/configs" render={(props: any) => <Configs {...props}  />} />
            <Route path="/posts" render={(props: any) => <Posts {...props}  />} />
            <Route path="/todos" render={(props: any) => <Todos {...props}  />} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
