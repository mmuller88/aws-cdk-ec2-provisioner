import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import { AuthState, onAuthUIStateChange, } from '@aws-amplify/ui-components';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import UserStore from './mobx/UserStore'

import { API } from './lib/fetcher';

import Amplify from 'aws-amplify';

import { Posts } from './components/posts';
import { Todos } from './components/todos';
import { Configs } from './components/configs';
import { Conversations } from './components/conversations';
import { Chat } from './components/chat';

declare const window: any;

Amplify.configure(window.ENV);

function App() {

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData: any) => {
      API.updateIsSignedIn(nextAuthState === AuthState.SignedIn);
    });
  }, []);

  UserStore.init()

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
        <AmplifySignOut button-text="Logout"></AmplifySignOut>
      </nav>
      <div>
        <Router>
          <Switch>
            <Route exact path="/" render={(props: any) => <Chat {...props}  />} />
            <Route path="/chat" render={(props: any) => <Chat {...props}  />} />
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
