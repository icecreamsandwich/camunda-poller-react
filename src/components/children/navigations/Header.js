import React, { Component } from 'react';
import Routes from '../../Routes';
import FakeAuth from '../../FakeAuth';

export default class Header extends Component {
  state = {
    isAuthenticated: false,
  };
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        isAuthenticated: FakeAuth.isAuthenticated,
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    console.log(this.state.isAuthenticated);
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
            {FakeAuth.isAuthenticated === true ? (
              <a href="/#logout">Logout</a>
            ) : (
              <a href="/#login">Login</a>
            )}
          </li>
        </ul>
        <Routes />
      </div>
    );
  }
}
