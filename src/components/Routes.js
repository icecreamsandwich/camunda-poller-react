import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import TaskPolling from './children/TaskPolling';
import ExternalTaskPolling from './children/ExternalTaskPolling';
import ProcessDefinitions from './children/ProcessDefinitions';
import ProcessInstances from './children/ProcessInstances';
import Home from './children/Home';

export default class Routes extends Component {
  render() {
    return (
      <HashRouter>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/tasks" component={TaskPolling} />
        <Route path="/processDefs" component={ProcessDefinitions} />
        <Route path="/processInsts" component={ProcessInstances} />
        <Route path="/externaltasks" component={ExternalTaskPolling} />
      </HashRouter>
    );
  }
}
