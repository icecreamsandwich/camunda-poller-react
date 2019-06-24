import React, { Component } from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import TaskPolling from './children/TaskPolling';
import ExternalTaskPolling from './children/ExternalTaskPolling';
import ProcessDefinitions from './children/ProcessDefinitions';
import ProcessInstances from './children/ProcessInstances';
import Home from './children/Home';
import Login from './children/Login';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }

}
//Private Route
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true ?
      <Component {...props} /> :
      <Redirect to='/login' />
  )}

  />
  
)


export default class Routes extends Component {
  render() {
    return (
      <HashRouter>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/tasks" component={TaskPolling} />
        {/* <Route path="/processDefs" component={ProcessDefinitions} /> */}
        <PrivateRoute path="/processDefs" component={ProcessDefinitions} />
        <Route path="/processInsts" component={ProcessInstances} />
        <Route path="/externaltasks" component={ExternalTaskPolling} />
        <Route path="/login" component={Login} />
      </HashRouter>
    );
  }
}
