import React, { Component } from 'react';
import '../../App.css';
import {environment} from '../../Utils/constants'
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Card, CardContent, Dialog, DialogContent,Avatar } from '@material-ui/core';
import emptyPic from '../../images/empty-profile-picture.png';
import { withApollo, graphql, compose } from 'react-apollo';
import { listApplicants } from '../../queries/queries';
import { changeJobStatus } from '../../mutations/mutations'

//Define a Login Component
class ViewApplicants extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            name: "",
            email: "",
            phone: "",
            job_id:this.props.match.params.jobId,
            dataRetrieved: false,
            redirect: false,
            stuData: [],
            view_profile:false,
            studId:"",
            toJobs : false,
            showStatus : "",
            statusUpdated:"",
            previewresume:false,
            emptyprofilepic:emptyPic
        }
        this.viewProfile = this.viewProfile.bind(this);
        this.tojobs = this.tojobs.bind(this);
    }

    updateStatus = async (jobId,applicationId,studentId) => {
        let data ={
            'jobId':jobId,
            'applicationId':applicationId,
            update:{
            'applications.$.status':this.state.showStatus}
        }
        // console.log(data)
        // axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        // axios.put(environment.baseUrl+'/company/updateStudentstatus', data)
        //     .then(response => {
        //         console.log(response)
        //         if (response.data.result){
        //             console.log(response.data.result)
        //             this.setState({
        //                 statusUpdated:true
        //             })
        //             this.fetchApplicants()
        //         }
        //         else if (response.data.error) {
        //             console.log(response.data.error)
        //             this.setState({
        //                 statusUpdated:false
        //             })
        //     }})
        let res = await this.props.client.mutate({
            mutation: changeJobStatus,
            variables: {
                studentId: studentId,
                jobId: jobId,
                status: this.state.showStatus
            },
            refetchQueries: [{
                query: listApplicants,
                variables: { jobId: sessionStorage.getItem("JobId") },
                fetchPolicy: 'no-cache'
            }]
        })

        console.log(res)

        let response = res.data.changeJobStatus

        if (response.status === "200") {
            if (response.status === "200") {
                this.setState(currentState => ({
                    statusUpdated:true
                }));
            }
            else {
                this.setState(currentState => ({
                    statusUpdated:false
                }));
            }
        }
    }
  
    viewProfile = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        console.log(e);
        this.setState({
            view_profile: true,
            studId:e
        })
        sessionStorage.setItem('sstudentId',e)
    }

    inputChangeHandler = (e) => {
        let value = e.target.value
        this.setState({
            [e.target.name] : value
        })
        console.log(this.state)
    }

    componentDidMount() {}

    tojobs = (e) =>{
        this.setState({
            toJobs:true
        })
    }

    render() {
        let renderRedirect = null;
        let selectStatus = null;
        // if (this.state.redirect === true) {
        //     renderRedirect = <Redirect to='/jobs' />
        // }
        if (this.state.view_profile === true) {
            renderRedirect = <Redirect to={`/company/viewStudent`}/>
        }

        if(this.state.showStatus === true){
            selectStatus = (<div style={{marginLeft:'20px',marginBottom:'10px'}}>
            <select name="showStatus" onChange={this.inputChangeHandler}>
                <option value="Change Status" >Change Status</option>
                <option value="Pending" >Pending</option>
                <option value="Reviewed" >Reviewed</option>
                <option value="Declined" >Declined</option>
            </select>
        </div>)
        }

        if(this.state.toJobs === true){
            renderRedirect = <Redirect to= "/company/home"/>
        }
        
        let stuData = this.props.data.listApplicants;
        console.log(stuData)
        return (
            <div>
                <div class="container">
                            <div class="panel1">
                                <h2 style={{position:'relative',top:'10px'}}>Students Applied </h2>
                                <div style={{float:'right',position:'relative',top:'-22px',marginRight:'10px'}}>
                                    <button onClick={this.tojobs} class="btn btn-primary" style={{backgroundColor:'#808080',borderRadius:'15px',border:'0px'}}><span class="glyphicon glyphicon-chevron-left" style={{ color: "white" }}></span>Back to jobs</button>
                                </div>
                            </div>    
                            <div>
                                {renderRedirect}
                            </div>
                                <div>
                                    {stuData?stuData[0].applications.map((data, index) => {
                                        return (
                                            <div style={{margin:"10px 0px 10px 100px",width:"80%"}}>
                                            <Card>
                                                <CardContent>
                                                <div key={data.studentId} style={{padding:'10px 0px 10px 50px'}}>
                                                <div className="row App-align">
                                                <div className="col-md-1">
                                                    <img src={this.state.emptyprofilepic} height='70' width='70' style={{ position:'relative',top:'20px',left:'-30px'}} alt='Profile'/>
                                                </div>
                                                <div className="col-md-8" style={{ fontSize: "23px", color: "#1569E0",marginLeft:"-10px" }}><Link onClick = {()=>(this.viewProfile(stuData[0].listApplicants[index]._id))}>{stuData[0].listApplicants[index].first_name+ " " +stuData[0].listApplicants[index].last_name}</Link>
                                                <div style={{ fontSize: "13px" }}><span class="glyphicon glyphicon-envelope" style={{ color: "#1569E0" }}></span> {stuData[0].listApplicants[index].email}</div>    
                                                <div style={{ fontSize: "13px" }}><span class="glyphicon glyphicon-book" style={{ color: "#1569E0" }}></span> {stuData[0].listApplicants[index].college}</div>
                                                <div style={{ fontSize: "13px" }}><span class="glyphicon glyphicon-calendar" style={{ color: "#1569E0" }}></span> Applied on {data.appliedDate.substring(0,10)}</div>
                                                <div style={{ fontSize: "13px" }}><span class="glyphicon glyphicon-time" style={{ color: "#1569E0" }}></span> Status:{data.status}</div></div>
                                                <div className="col-md-3">
                                                <div style={{marginLeft:'15px',marginBottom:'10px', border:'2px'}}>
                                                    <select name="showStatus" onChange={this.inputChangeHandler}>
                                                        <option value="Change Status" disabled selected>Change Status</option>
                                                        <option value="Pending" >Pending</option>
                                                        <option value="Reviewed" >Reviewed</option>
                                                        <option value="Declined" >Declined</option>
                                                    </select></div>
                                                    <button class="btn btn-primary" style={{backgroundColor:'#1569E0', marginLeft:'15px', borderRadius:'15px'}} onClick={()=>(this.updateStatus(stuData[0]._id,data._id,stuData[0].listApplicants[index]._id))}>Update Status</button>
                                                    {/* <button class="btn btn-primary" style={{backgroundColor:'#808080', marginTop:'20px', marginLeft:'15px', borderRadius:'15px', width :'113px',border:'0px'}} onClick={()=>this.previewResume()}><span class="glyphicon glyphicon-paperclip" style={{ color: "white" }}></span>   Resume</button> */}
                                                    </div>
                                                    <Dialog
                                                        aria-labelledby="simple-modal-title"
                                                        aria-describedby="simple-modal-description" 
                                                        open={this.state.previewresume}
                                                        style = {{height:"800", width:"500"}}>
                                                        <div>
                                                        <h2 id="simple-modal-title">Resume</h2>
                                                        <DialogContent>
                                                            <div>
                                                            <object type="application/pdf"
                                                                data={data.resume}
                                                                width="500"
                                                                height="800">
                                                            </object>
                                                            </div>
                                                            <div className='col-md-9'>
                                                            </div>
                                                            <div className='col-md-3'>
                                                                <button onClick={()=>{this.previewResume()}} class="btn btn-primary" style={{backgroundColor:'#1569E0',borderRadius:'5px'}}>Close</button>
                                                            </div>
                                                        </DialogContent>                  
                                                        </div>
                                                    </Dialog>
                                            
                                                </div>
                                                </div>
                                                </CardContent>
                                            </Card>
                                            </div>
                                            
                                        )
                                    }):<div></div>}
                                </div>                          
                        </div>
                    </div>
        )
    }
}

export default compose(withApollo,
    graphql(listApplicants, {
   options: {
       variables: {  jobId: sessionStorage.getItem('JobId') }
   }
}),)(ViewApplicants)