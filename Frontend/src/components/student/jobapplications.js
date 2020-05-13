import React,{Component} from 'react';
import cookie from 'react-cookies';
import StudentNav from './studentNavbar';
import { Card, CardContent, TablePagination} from '@material-ui/core/';
import axios from 'axios';
import emptyPic from '../../images/empty-profile-picture.png';
import {environment} from '../../Utils/constants'
import { withApollo,graphql, compose } from 'react-apollo';
import { listAppliedJobs } from '../../queries/queries';


//create the Student Home Component
class JobApplications extends Component {
    constructor(props){
        super(props);
        this.state = {
            studentId: "",
            applications: null,
            jobindex: 0,
            jobfilter: [],
            status:"",
            emptyprofilepic:emptyPic,
            rowsPerPage:5,
            page:0
        }
        this.statusFilter = this.statusFilter.bind(this)
    }

    handleChangePage = (event, newPage) => {
        this.setState({
            page:newPage
        })
      };
    
    handleChangeRowsPerPage = (event) => {
        let rowsPerPage = parseInt(event.target.value, 10)
        this.setState({
            page:0,
            rowsPerPage:rowsPerPage
        })
      };

    statusFilter(e){
        console.log(e)
        this.setState({
            status:e.target.value
        })
    }

    componentDidMount() {
    }

    render(){
        let jobapplications = null;
        console.log(this.props.data)
        let applications = this.props.data.listAppliedJobs
        if (applications){
            if (this.state.status){
                applications=applications.filter((app) => {
                    return this.state.status.indexOf(app.applications[0].status) > -1
                })
            }
            jobapplications = (
                <div>
                    {applications.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((app,index) => {
                // {applications.map((app, index) => {
                    
                return (<Card style={{marginBottom:'20px'}}>
                    <CardContent>
                        <div class="col-md-1">
                        <img src={app.companydetails[0].image?app.companydetails[0].image:this.state.emptyprofilepic} height='70' width='70' style={{ position:'relative',top:'8px',left:'-15px'}} alt='Profile'/>
                        </div>
                        <div class="col-md-9" style={{marginBottom:'16px'}}>
                        <div style={{fontSize: '16px', fontWeight: '700' }}>{app.title}</div>
                        <div style={{fontSize: '16px', fontWeight: '500' }}>{app.companydetails[0].name}</div>
                        <div style={{fontSize: '16px', fontWeight: '500'}}>{"status:" + app.applications[0].status}</div>
                        <div>Applied on {app.applications[0].appliedDate} - Applications close on {app.deadline.slice(0,10)}</div></div>
                    </CardContent>
                </Card>)
                })}
                <div class='row'>
                <div class='col-md-7'></div>
                <TablePagination
                                rowsPerPageOptions={[2, 5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={applications.length}
                                rowsPerPage={this.state.rowsPerPage}
                                page={this.state.page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                style={{}}
                                />
                </div>
                </div>
        )}


       return(<div>
        <StudentNav comp="jobapplications"/>
        <div style={{ paddingLeft: '5%', paddingRight: '5%', fontFamily: 'Arial' }}>
        <div class="col-md-3">
            <Card>
                <CardContent>
                    <div>
                    <div style={{fontWeight:'550',fontSize:'16px',marginBottom:'20px'}}>Filters</div>
                    <div style={{fontWeight:'550',fontSize:'13px',padding:'16px'}}>Status</div>
                    <select id="status" name="status" style = {{width:"80%",fontSize:'13px',marginLeft:'16px'}} onChange={this.statusFilter} >
                        <option value="" disabled selected>+ Add Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Declined">Declined</option>
                    </select></div>
                </CardContent>
            </Card>
        </div>
        <div class="col-md-9">
            {jobapplications}
        </div>
        </div>
        </div>
       )
}
}

export default compose(withApollo,
    graphql(listAppliedJobs, {
   options: {
       variables: {  studentId: sessionStorage.getItem("studentId") }
   }
}),)(JobApplications)