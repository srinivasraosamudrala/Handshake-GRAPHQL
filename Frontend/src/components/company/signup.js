import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { environment } from '../../Utils/constants';
import { graphql, compose, withApollo } from 'react-apollo';
import { addCompany } from '../../mutations/mutations';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            location: "",
            authFlag: false,
            authError: false
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submitSignup = this.submitSignup.bind(this);
    }

    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }

    inputChangeHandler = (e) => {
        let value = e.target.value
        this.setState({
            [e.target.name]: value
        })
    }

    submitSignup = async (e) => {
        e.preventDefault();
        let res = await this.props.client.mutate({
            mutation: addCompany,
            variables: {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                location: this.state.location
            }
        })
        console.log(res)
        let response = res.data.addCompany;
        console.log(response)
        if (response._id) {
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
        if (this.state.authFlag === true) {
            redirectVar = <Redirect to="/company/login" />
        }

        if (this.state.authError === true) {
            invalid = <p>Email Id is Taken</p>
        }

        return (
            <div>
                {redirectVar}
                <div class="container">

                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <title>Handshake</title>
                                <h1>Sign Up</h1>
                                <p>Please enter your details</p>
                            </div>
                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="name" placeholder="Company Name" />
                            </div>
                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="email" placeholder="Email ID" />
                            </div>
                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="password" class="form-control" name="password" placeholder="Password" />
                            </div>
                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="location" placeholder="Location" />
                            </div>
                            <button onClick={this.submitSignup} class="btn btn-primary">Signup</button>
                            <div>{invalid}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// export default Signup;
export default withApollo(Signup)