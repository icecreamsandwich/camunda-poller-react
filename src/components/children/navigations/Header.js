import React, { Component } from 'react';
import Routes from '../../Routes';

export default class Header extends Component {
  render() {
    return (
      <div>
        <ul className="ul_header">
          <li>
            <a className="active" href="/#home">
              Home
            </a>
          </li>
          <li>
            <a href="/#processDefs">Process defs</a>
          </li>
          <li>
            <a href="/#processInsts">Process Instances</a>
          </li>
          <li>
            <a href="/#tasks">Tasks</a>
          </li>
          <li>
            <a href="/#externaltasks">External Tasks</a>
          </li>
          <li style={{ float: 'right' }}>
            <a href="#about">Login</a>
          </li>
        </ul>
        <Routes />
      </div>
    );
  }
}
