import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FakeAuth from '../FakeAuth';

class Logout extends Component {
  render() {
    FakeAuth.signout();
    return <Redirect to="/login" />;
  }
}
export default Logout;
