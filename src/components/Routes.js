import React, { Component } from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import TaskPolling from './children/TaskPolling';
import ExternalTaskPolling from './children/ExternalTaskPolling';
import ProcessDefinitions from './children/ProcessDefinitions';
import ProcessInstances from './children/ProcessInstances';
import Home from './children/Home';
import Login from './children/Login';
import Logout from './children/Logout';
import FakeAuth from './FakeAuth';

//Private Route
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      FakeAuth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: {
              from: props.location,
            },
          }}
        />
      )
    }
  />
);

export default class Routes extends Component {
  render() {
    return (
      <HashRouter>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <PrivateRoute path="/tasks" component={TaskPolling} />
        {/* <Route path="/processDefs" component={ProcessDefinitions} /> */}
        <PrivateRoute path="/processDefs" component={ProcessDefinitions} />
        <PrivateRoute path="/processInsts" component={ProcessInstances} />
        <PrivateRoute path="/externaltasks" component={ExternalTaskPolling} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
      </HashRouter>
    );
  }
}
