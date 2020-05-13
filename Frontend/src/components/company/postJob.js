import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { environment } from '../../Utils/constants';
import { withApollo } from 'react-apollo';
import { addJob } from '../../mutations/mutations'

class postJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            postingDate: "",
            deadline: "",
            location: "",
            salary: 0,
            desc: "",
            category: "",
            createJob: false,
            toJobs: false
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.postJob = this.postJob.bind(this);
        this.tojobs = this.tojobs.bind(this);
    }

    componentWillMount() {
        this.setState({
            createJob: false
        })
    }

    inputChangeHandler = (e) => {
        let value = e.target.value
        this.setState({
            [e.target.name]: value
        })
        console.log(this.state)
    }

    postJob = async (e) => {
        e.preventDefault();

        let res = await this.props.client.mutate({
            mutation: addJob,
            variables: {
                companyId: sessionStorage.getItem('companyId'),
                title: this.state.title,
                posting_date: new Date().toISOString(),
                deadline: this.state.deadline,
                location: this.state.location,
                salary: this.state.salary,
                description: this.state.desc,
                category: this.state.category
            }
        })

        this.setState({
            createJob: true
        })

        const data = {
            company_id: sessionStorage.getItem('companyId'),
            title: this.state.title,
            posting_date: new Date().toISOString(),
            deadline: this.state.deadline,
            location: this.state.location,
            salary: this.state.salary,
            job_description: this.state.desc,
            category: this.state.category
        }
        axios.defaults.withCredentials = true;
        console.log(data)
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.post(environment.baseUrl + '/company/postjob', data)
            .then(response => {
                if (response.data.result) {
                    this.setState({
                        createJob: true
                    })
                } else {
                    this.setState({
                        createJob: false
                    })
                }
            })
    }

    tojobs = (e) => {
        this.setState({
            toJobs: true
        })
    }

    render() {

        let redirectVar = null;
        let invalid = null;

        if (this.state.createJob === true) {
            redirectVar = <Redirect to="/company/home" />
        }

        if (this.state.toJobs === true) {
            redirectVar = <Redirect to="/company/home" />
        }

        return (
            <div>
                {redirectVar}
                <div class="container">
                    <div class="col-md-9"></div>
                    <div class="col-md-3"><button onClick={this.tojobs} class="btn btn-primary" style={{ backgroundColor: '#808080', borderRadius: '15px', border: '0px' }}><span class="glyphicon glyphicon-chevron-left" style={{ color: "white" }}></span>Back to jobs</button></div>
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <h1>Post Job</h1>
                                <p>Please enter the Job details</p>
                            </div>
                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="title" placeholder="Job Title" />
                            </div>
                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="date" class="form-control" name="deadline" placeholder="Deadline" />
                            </div>
                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="location" placeholder="Location" />
                            </div>
                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="salary" placeholder="Salary" />
                            </div>
                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="desc" placeholder="Description" />
                            </div>
                            <div class="form-group">
                                <select name="category" onChange={this.inputChangeHandler} class="form-control">
                                    <option value="cate">Pick a Category</option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Part Time">Part Time</option>
                                    <option value="Internship">Internship</option>
                                    <option value="On Campus">On Campus</option>
                                </select>
                            </div>
                            <button onClick={this.postJob} class="btn btn-primary">Add Job</button>
                            <div>{invalid}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withApollo(postJob)