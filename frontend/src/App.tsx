import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, HashRouter, NavLink, Route, Switch } from 'react-router-dom';
import './App.css';

import { AuthState, onAuthUIStateChange, } from '@aws-amplify/ui-components';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import { useListEc2Query } from './lib/api';


import { API } from './lib/fetcher';

import Amplify, { Auth } from 'aws-amplify';

import { Posts } from './components/posts';
import { Todos } from './components/todos';
import { Configs } from './components/configs';
import { Chat, ChatProps } from './components/chat';
import { Vms } from './components/vms';
import { AppContext } from './components/Ec2DetailsProvider';

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
    <HashRouter>
    <div className="App">
      <nav className="Navbar">
        <h1 className="navbar-logo">Hacklab Demo</h1>
        <ul className="nav-menu">
          <li><NavLink to="/vms">Vms</NavLink></li>
          <li><NavLink to="/chat">Chat</NavLink></li>
          <li><NavLink to="/configs">Configs</NavLink></li>
          <li><NavLink to="/posts">Posts</NavLink></li>
          <li><NavLink to="/todos">Todos</NavLink></li>
        </ul>
        <div>
          <span>signed in: {username}</span>
          <AmplifySignOut button-text="Logout"></AmplifySignOut>
        </div>
      </nav>
       
        <div>
            <Switch>
              <AppContext.Provider value={ {
                ec2List: useListEc2Query(null, {
                    refetchOnWindowFocus: false
                  }).data,
                } }> 
                <Route exact path="/" component={Vms} />
                <Route path="/vms/:id" component={Vms} />
                <Route path="/vms" component={Vms} />
                <Route path="/configs" component={Configs} />
              </AppContext.Provider>
              <Route path="/chat" component={() => Chat({username})} />
              <Route path="/posts" component={Posts} />
              <Route path="/todos" component={Todos} />
            </Switch>
        </div>
      
    </div>
    </HashRouter>
  );
}

export default withAuthenticator(App);
