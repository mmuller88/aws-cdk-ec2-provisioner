import React, { useEffect, useState } from 'react';
import { QueryResult } from 'react-query';
import { HashRouter, NavLink, Route, Switch } from 'react-router-dom';
import './App.css';

import Amplify, { Auth } from 'aws-amplify';
import { AuthState, onAuthUIStateChange, } from '@aws-amplify/ui-components';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import { useListEc2ConfigsQuery, useListEc2Query, ListEc2Query, ListEc2ConfigsQuery } from './lib/api';
import { API } from './lib/fetcher';

import { Posts } from './components/posts';
import { Todos } from './components/todos';
import { Configs } from './components/configs';
import { Chat } from './components/chat';
import { Vms } from './components/vms';

declare const window: any;

Amplify.configure(window.ENV);
Auth.configure(window.ENV);

type ContextProps = {
  ec2List: ListEc2Query,
  configResult: QueryResult<ListEc2ConfigsQuery, any>
};

export const AppContext = React.createContext<Partial<ContextProps>>({});

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
        {/* <h1 className="navbar-logo">Hacklab Demo</h1> */}
        <a className="navbar-logo" href="#/">Hacklab Demo</a>
        <ul className="nav-menu">
          <li><NavLink to="/vms">Vms</NavLink></li>
          <li><NavLink to="/configs">Configs</NavLink></li>
          <li><NavLink to="/chat">Chat</NavLink></li>
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
            <Route path="/chat" component={() => Chat({username})} />
              <Route path="/posts" component={Posts} />
              <Route path="/todos" component={Todos} />
              <AppContext.Provider value={ {
                ec2List: useListEc2Query(null, {
                    refetchOnWindowFocus: false
                  }).data,
                configResult: useListEc2ConfigsQuery(null, {
                    refetchOnWindowFocus: false
                  }),
                } }> 
                <Route exact path="/" component={Vms} />
                <Route exact path="/vms" component={Vms} />
                <Route exact path="/vms/:id" component={Vms} />
                <Route exact path="/configs" component={Configs} />
                <Route exact path="/configs/:id" component={Configs} />
              </AppContext.Provider>
              
            </Switch>
        </div>
      
    </div>
    </HashRouter>
  );
}

export default withAuthenticator(App);
