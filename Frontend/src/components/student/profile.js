import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import {Card} from '@material-ui/core/';
import {environment} from '../../Utils/constants';
import Profile1 from "./profileComponents/profile1";
import CareerObj from './profileComponents/careerobj';
import Skillset from './profileComponents/skills';
import PersonalInfo from './profileComponents/personalinfo';
import Education from './profileComponents/education';
import Experience from './profileComponents/experience';
import { withApollo,graphql, compose } from 'react-apollo';

import { student } from '../../queries/queries';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profiledata:{},
            studentId: ""
        }
    }

    componentDidMount() {
        this.getProfileData()
    }

    getProfileData= async ()=>{
        const { data } = await this.props.client.query({
            query: student,
            variables: { studentId: sessionStorage.getItem("studentId") },
            fetchPolicy: 'no-cache'
        })
        console.log(data)
        this.setState({
            profiledata: data.student
        })
    }
    render() {
        var result = {}
        result=this.props.data.student
        if(result){
            console.log(result)
        }

        return (
            <div style={{ width: "95%", backgroundColor: '#F7F7F7', fontFamily:'Arial'}}>
                <div class="container" style={{  backgroundColor: '#F7F7F7' }}>
                    <div class="col-md-1">
                    </div>
                    <div class="col-md-3">
                        <div class="row" style={{ marginBottom: '20px', marginRight: '20px'}}>
                            <Profile1   profile = {result} />
                        </div>
                        <div class="row" style={{ marginBottom: '20px', marginRight: '20px' }}>
                            {/* <Skillset   profile = {this.state.profiledata.skills}
                                        updateSkill = {this.props.updateSkill}
                                        addskill = {this.props.addskill} /> */}
                        </div>
                        <div class="row" style={{ marginBottom: '20px', marginRight: '20px' }}>
                            <PersonalInfo   profile = {result}/>
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div class="row" style={{ marginBottom: '20px' }}>
                            <Card>
                                <CareerObj profile = {result?result.career_objective:""}/>
                            </Card>
                        </div>
                        <div class="row" style={{ marginBottom: '20px' }}>
                            <Card>
                                <Education profile = {result?result.education:[]}/>
                            </Card>
                        </div>
                        <div class="row" style={{ marginBottom: '20px' }}>
                            <Card>
                                <Experience profile = {result?result.experience:[]}/>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default compose(withApollo,
     graphql(student, {
    options: {
        variables: {  studentId: sessionStorage.getItem("studentId") }
    }
}),)(Profile)