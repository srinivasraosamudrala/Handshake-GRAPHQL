import React, { Component } from 'react';
import '../../App.css';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { companyLogin } from '../../mutations/mutations';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyid: 0,
            email: "",
            password: "",
            authFlag: false,
            authError: false,
            token: ""
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }
    inputChangeHandler = (e) => {
        const value = e.target.value
        this.setState({
            [e.target.name]: value
        })
    }
    submitLogin = async (e) => {
        e.preventDefault();
        let res = await this.props.client.mutate({
            mutation: companyLogin,
            variables: {
                email: this.state.email,
                password: this.state.password
            }
        })

        console.log(res)
        let response = res.data.companyLogin;
        console.log(response)
        if (response._id) {
            sessionStorage.setItem('companyId', response._id);
            this.setState({
                authFlag: true,
                authError: false
            })
        } else {
            this.setState({
                authFlag: false,
                authError: true
            })
        }
    }

    render() {
        let redirectVar = null;
        let invalid = null;
        if (sessionStorage.getItem('companyId')) {
            console.log("route to home")
            redirectVar = <Redirect to='/company/home' />
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
                                <p>Please enter your email id and password</p>
                            </div>

                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="email" class="form-control" name="email" placeholder="Username" />
                            </div>
                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="password" class="form-control" name="password" placeholder="Password" />
                            </div>
                            <button onClick={this.submitLogin} class="btn btn-primary">Login</button>
                            <div>{invalid}</div>
                        </div>
                        <div>
                            <Link to="/company/signup">Dont have an account?Signup Here!</Link></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withApollo(Login)