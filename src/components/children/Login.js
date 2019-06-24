import React, { Component } from 'react'

export default class Login extends Component {
    state = {
        isAuthenticated : false,
        username : "",
        password : ""
    }
    //Input change Handler
    handleChange = (event) =>{ 
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    //Form Submit Handler
    SubmitForm = (e) =>{
        e.preventDefault();
        if(this.state.username === "admin" && this.state.password === "admin"){
            this.setState({
                isAuthenticated : true
            })
        }
        console.log(this.state.username + ":" + this.state.password)
    }
    render() {
        return (
            <React.Fragment>
                <div>
                    <h2>Login Form</h2>

                    <form onSubmit={(e) => this.SubmitForm(e)}>
                        <div className="imgcontainer">
                            <img src="/assets/images/img_avatar2.png" alt="Avatar" className="avatar" />
                        </div>

                        <div className="container">
                            <label ><b>Username</b></label>
                            <input type="text" onChange={(e) => this.handleChange(e)} placeholder="Enter Username" name="username" required />

                            <label ><b>Password</b></label>
                            <input type="password" onChange={(e) => this.handleChange(e)} placeholder="Enter Password" name="password" required />

                            <button type="submit">Login</button>
                            {/* <label>
                                <input type="checkbox" checked="checked" value="Remember" name="remember" /> Remember Password 
                            </label> */}
                        </div>

                        <div className="container" style={{backgroundColor:'#f1f1f1'}}>
                            <button type="button" className="cancelbtn">Cancel</button>
                            <span className="psw">Forgot <a href="/#forgot">password?</a></span>
                        </div>
                    </form>

                </div>
            </React.Fragment>

        )
    }
}
