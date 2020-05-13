import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import '../../App.css';
import {environment} from '../../Utils/constants'
import { Card, CardContent, Button, IconButton, InputBase, TextField, Avatar } from '@material-ui/core/';
import Icon from '@material-ui/core/Icon';
import SearchIcon from '@material-ui/icons/Search';
import Company_Logo from '../../images/Cover_Letter_Social.png'
import { withApollo } from 'react-apollo';
import { company } from '../../queries/queries';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyId: sessionStorage.getItem('currcompanyId'),
            profile:null
        }
    }
    componentDidMount(){
        // this.setState({ studentId: sessionStorage.getItem('studentId') })
        this.fetchCompanydetails()
    }

    async fetchCompanydetails() {
        const { data } = await this.props.client.query({
            query: company,
            variables: { companyId: sessionStorage.getItem("companyId") },
            fetchPolicy: 'no-cache'
        })
        this.setState({
            profile: data.company,
        })
    }
    render(){
        let companyEdit = null;
        if (this.state.profile){
        companyEdit = (
            <div>
            <Card style={{borderTopRightRadius:'0px',borderTopLeftRadius:'0px'}}>
                        <CardContent>
                            <img src = {this.state.profile.image} alt = 'Logo' height='70' width='70' ></img>
                            <div style = {{position:'relative', top:'-70px',left:'85px'}}>
                                <div><h4>{this.state.profile.name}</h4></div>
                                <div className="col-md-5" style={{marginLeft:"-10px",marginTop:"7px"}}><span class="glyphicon glyphicon-map-marker" style={{color: "Black" }}></span> {this.state.profile.location}</div>
                                <div className="col-md-4" style={{marginLeft:"-10px",marginTop:"7px"}}><span class="glyphicon glyphicon-envelope" style={{color: "Black" }}></span> {this.state.profile.email}</div>
                                </div>
                        </CardContent>
                    </Card>
                    <div style = {{marginTop : '20px', width:'103%',position:'relative',left:'-14px'}}>
                    <div className="col-md-8">
                    <Card>
                        <CardContent>
                            <h4>{'About ' + this.state.profile.name}</h4>
                            {this.state.profile.company_description}
                        </CardContent>
                    </Card>
                    </div>
                    <div className="col-md-4">
                    <Card>
                        <CardContent>
                            <h4>Contact Information</h4>
                            <div style={{fontSize : "12px", marginTop:'15px'}}>Email</div>
                            <div style={{color: "#1569E0"}}>{this.state.profile.email}</div>
                            <div style={{fontSize : "12px", marginTop:'10px'}}>Phone</div>
                            <div style={{color: "#1569E0"}}>{this.state.profile.phone}</div>
                        </CardContent>
                    </Card>
                 </div>
                 </div>
                </div>)
        }
        return(
            <div style={{width:'90%',paddingLeft:'120px'}}>
                <Card>
                    <div style={{height:"200px"}}>
                        <img src={Company_Logo} alt='Company Cover Photo'></img>
                    </div>
                </Card>
                {companyEdit}
                
            </div>
        )
    }
}

export default withApollo(Profile)