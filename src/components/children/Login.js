import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FakeAuth from '../FakeAuth';

export default class Login extends Component {
  state = {
    isAuthenticated: false,
    username: '',
    password: '',
  };
  //Input change Handler
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  //Form Submit Handler
  SubmitForm = e => {
    e.preventDefault();
    //TODO
    //check in db that entered username and password is correct
    if (this.state.username === 'admin' && this.state.password === 'admin') {
      FakeAuth.authenticate(() => {
        this.setState(() => ({
          isAuthenticated: true,
        }));
      });
    } else {
      alert('username or password is incorrect');
    }
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { isAuthenticated } = this.state;
    if (isAuthenticated === true) {
      return <Redirect to={from} />;
    }
    return (
      <React.Fragment>
        <div>
          <h2>Login</h2>

          <form onSubmit={e => this.SubmitForm(e)}>
            <div className="imgcontainer">
              <img
                src="/assets/images/img_avatar2.png"
                alt="Avatar"
                className="avatar"
              />
            </div>

            <div className="container">
              <label>
                <b>Username</b>
              </label>
              <input
                type="text"
                onChange={e => this.handleChange(e)}
                placeholder="Enter Username : admin"
                name="username"
                required
              />

              <label>
                <b>Password</b>
              </label>
              <input
                type="password"
                onChange={e => this.handleChange(e)}
                placeholder="Enter Password : admin"
                name="password"
                required
              />

              <button type="submit">Login</button>
            </div>

            <div className="container" style={{ backgroundColor: '#f1f1f1' }}>
              <button type="button" className="cancelbtn">
                Cancel
              </button>
              <span className="psw">
                Forgot <a href="/#forgot">password?</a>
              </span>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
