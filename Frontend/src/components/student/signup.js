import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { environment } from '../../Utils/constants';
import { graphql, compose, withApollo } from 'react-apollo';
import { addStudent } from '../../mutations/mutations';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            college: "",
            authFlag: false,
            authError: false
        }
        //Bind the handlers to this class
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
        console.log(this.state)
    }

    submitSignup = async (e) => {

        e.preventDefault();

        let res = await this.props.client.mutate({
            mutation: addStudent,
            variables: {
                first_name: this.state.firstname,
                last_name: this.state.lastname,
                email: this.state.email,
                password: this.state.password,
                college: this.state.college
            }
        })

        console.log(res)

        let response = res.data.addStudent;

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
            redirectVar = <Redirect to="/student/login" />
        }

        if (this.state.authError === true) {
            invalid = <p>Invalid Details</p>
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
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="firstname" placeholder="First Name" />
                            </div>
                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="lastname" placeholder="Last Name" />
                            </div>
                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="email" placeholder="Email ID" />
                            </div>
                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="password" class="form-control" name="password" placeholder="Password" />
                            </div>
                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="college" placeholder="College Name" />
                            </div>
                            <button onClick={this.submitSignup} class="btn btn-primary">Signup</button>
                            <div>{invalid}</div>
                            <Link to="/company/signup">Not a student?Click here for company login!</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
//export Signup Component
// export default Signup;
export default withApollo(Signup);