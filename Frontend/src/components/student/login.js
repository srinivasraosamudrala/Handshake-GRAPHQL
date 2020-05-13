import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { environment } from '../../Utils/constants'
import { withApollo } from 'react-apollo';
import { studentLogin } from '../../mutations/mutations';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            authFlag: false,
            authError: false,
            token: ""
        }
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }

    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    submitLogin = async (e) => {
        e.preventDefault();
        let res = await this.props.client.mutate({
            mutation: studentLogin,
            variables: {
                email: this.state.username,
                password: this.state.password
            }
        })

        console.log(res)
        let response = res.data.studentLogin;
        console.log(response)
        sessionStorage.setItem("studentId", response._id);
        if (response._id) {
            this.setState({
                authFlag: true,
                authError: false
            })
        }else {
            console.log(response.data.error)
            this.setState({
                authFlag: false,
                authError: true
            })
        }
    }

    render() {
        let redirectVar = null;
        let invalid = null;
        console.log(sessionStorage.getItem('studentId'))
        if (sessionStorage.getItem('studentId')) {
            console.log("redirect")
            redirectVar = <Redirect to="/student/jobs/search" />
        }

        if (this.state.authError === true) {
            invalid = <p>Invalid Credentials</p>
        }

        return (
            <div>
                {redirectVar}
                <div class="container">
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <title>Handshake</title>
                                <h1>Sign in</h1>
                                <p>Please enter your email and password</p>
                            </div>

                            <div class="form-group">
                                <input onChange={this.usernameChangeHandler} type="email" class="form-control" name="username" placeholder="Username" />
                            </div>
                            <div class="form-group">
                                <input onChange={this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password" />
                            </div>
                            <button onClick={this.submitLogin} class="btn btn-primary">Login</button>
                            <div>{invalid}</div>
                        </div>
                        <div style={{ paddingBottom: '15px' }}>
                            <Link to="/company/login">Not a student?Click here for company login!</Link><br />
                            <Link to="/student/signup">Dont have an account?Signup Here!</Link></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withApollo(Login)