import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import StudentNav from './studentNavbar';
import { Card, CardContent, Button, Dialog, DialogContent, TablePagination, Avatar } from '@material-ui/core/';
import CategoryIcon from '@material-ui/icons/Category';
import emptyPic from '../../images/empty-profile-picture.png';
import { environment } from '../../Utils/constants'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Dropdown } from 'react-bootstrap'
import { withApollo,graphql, compose } from 'react-apollo';
import { applyJob } from '../../mutations/mutations'
import { alljobs } from '../../queries/queries';



//create the Student Home Component
class JobSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentId: 0,
            joblist: null,
            jobindex: 0,
            jobfilter: [],
            namesearch: "",
            locsearch: "",
            appiledJob: [],
            style: [],
            uploadresume: false,
            resume: null,
            currentjobId: 0,
            currentcompanyId: 0,
            emptyprofilepic: emptyPic,
            rowsPerPage: 5,
            page: 0
        }
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.showJob = this.showJob.bind(this);
        this.jobFliter = this.jobFilter.bind(this);
        this.applyJob = this.applyJob.bind(this);
        this.uploadResume = this.uploadResume.bind(this);
        this.getResume = this.getResume.bind(this);
    }

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
    };

    handleChangeRowsPerPage = (event) => {
        let rowsPerPage = parseInt(event.target.value, 10)
        this.setState({
            page: 0,
            rowsPerPage: rowsPerPage
        })
    };

    inputChangeHandler = (e) => {
        const value = e.target.value
        this.setState({
            [e.target.name]: value
        })
    }

    getResume = (e) => {
        this.setState({
            resume: e.target.files[0]
        })
    }

    showJob = (e,companyId) => {
        sessionStorage.setItem('currcompanyId',companyId)
        this.setState({
            jobindex: e
        })
        console.log('currentcompanyId')
    }


    jobFilter = (e) => {
        let jobfilters = this.state.jobfilter
        let jobtypeindex = jobfilters.indexOf(e)
        if (jobtypeindex <= -1) {
            jobfilters.push(e)
            this.setState({
                jobfilter: jobfilters
            })
        } else {
            jobfilters.splice(jobtypeindex, 1)
            this.setState({
                jobfilter: jobfilters
            })
        }
    }

    applyJob = async (jobId, companyId) => {
        console.log(jobId)
        let res = await this.props.client.mutate({
            mutation: applyJob,
            variables: {
                job_id: jobId,
                stud_id: sessionStorage.getItem('studentId'),
                app_date: new Date()
            },
            refetchQueries: [{
                query: alljobs,
                variables: {},
                fetchPolicy: 'no-cache'
            }]
        })

        console.log(res)

        let response = res.data.applyJob

        if (response.status === "200") {
            if (response.status === "200") {
                this.setState(currentState => ({
                    success: true,
                    updateprofile: !currentState.updateprofile
                }));
            }
            else {
                this.setState(currentState => ({
                    updateprofile: !currentState.updateprofile
                }));
            }
        }
    }

    uploadResume = (companyId, jobId) => {
        console.log(companyId)
        console.log(jobId)
        console.log("Resume upload")
        this.setState(currentState => ({
            uploadresume: !currentState.uploadresume,
            currentjobId: jobId,
            currentcompanyId: companyId
        }))
    }


    componentDidMount() {
        this.setState({
            studentId:sessionStorage.getItem('studentId')
        })
    }


    sortbyloc() {
        let joblist = this.props.joblist

        let compare = (a,b) =>{
            let comparison = 0
            
            if (a.location > b.location) {
                comparison = 1;
              } else if (a.location < b.location) {
                comparison = -1;
              }
              return comparison;
        }
        if (joblist.length)
            joblist.sort(compare);


        this.setState({
            joblist:joblist
        })
    }

    sortbyPostingDate() {
        let joblist = this.props.data.alljobs

        let compare = (a,b) =>{
            let comparison = 0
            if (a.posting_date > b.posting_date) {
                comparison = 1;
              } else if (a.posting_date < b.posting_date) {
                comparison = -1;
              }
              return comparison;
        }
        if (joblist.length)
            joblist.sort(compare);


        this.setState({
            joblist:joblist
        })
    }

    sortbyPostingDatedesc() {
        let joblist = this.props.data.alljobs

        let compare = (a,b) =>{
            let comparison = 0
            if (a.posting_date < b.posting_date) {
                comparison = 1;
              } else if (a.posting_date > b.posting_date) {
                comparison = -1;
              }
              return comparison;
        }
        if (joblist.length)
            joblist.sort(compare);


        this.setState({
            joblist:joblist
        })
    }

    sortbyDeadline() {
        let joblist = this.props.data.alljobs

        let compare = (a,b) =>{
            let comparison = 0
            if (a.deadline > b.deadline) {
                comparison = 1;
              } else if (a.deadline < b.deadline) {
                comparison = -1;
              }
              return comparison;
        }
        if (joblist.length)
            joblist.sort(compare);


        this.setState({
            joblist:joblist
        })
    }

    sortbyDeadlinedesc() {
        let joblist = this.props.data.alljobs

        let compare = (a,b) =>{
            let comparison = 0
            if (a.deadline < b.deadline) {
                comparison = 1;
              } else if (a.deadline > b.deadline) {
                comparison = -1;
              }
              return comparison;
        }
        if (joblist.length)
            joblist.sort(compare);

        this.setState({
            joblist:joblist
        })
    }

    render() {
        let jobs = null;
        let detailedjob = null;
        let jobdetailed = null;
        let jobfilter = [];
        let namesearch = this.state.namesearch;
        let locsearch = this.state.locsearch;
        let applications = null;
        let jobapplybutton = null;
        let sortfilter = null;

        console.log(this.props.data)

        if (this.props.data.alljobs) {
            // console.log(this.props.joblist)
            let joblist = this.props.data.alljobs
            jobfilter = this.state.jobfilter

            if (namesearch.length > 0) {
                joblist = joblist.filter((job) => {
                    return (job.title.indexOf(namesearch) > -1 || job.companydetails[0].name.indexOf(namesearch) > -1)
                })
            }

            if (locsearch.length > 0) {
                joblist = joblist.filter((job) => {
                    return job.location.indexOf(locsearch) > -1
                })
            }
            if (jobfilter.length > 0) {
                joblist = joblist.filter((job) => {
                    return jobfilter.indexOf(job.category) > -1
                })
            }

            if (sortfilter === "") {

            }

            if (joblist.length > 0) {
                jobs = (
                    <div>
                        <div style={{ height: '500px', overflow: 'auto' }}>
                            <div class='row' style={{width:'315px'}}>
                                <div class='col-md-4' style={{ position:'relative',fontWeight:'700', top:'5px'}}>Jobs</div>
                                <div class="col-md-4"></div>
                                <div class="col-md-4" style={{width:'50px'}}>
                                        <DropdownButton  variant="secondary" size="sm" title="Relevence" style={{width:'50px'}}>
                                            <div style={{width:'170px'}}>
                                            <Dropdown.Item onClick={()=>{this.sortbyloc()}} style={{paddingLeft:'5px', color:'black'}}>Location</Dropdown.Item><br />
                                            <Dropdown.Item onClick={()=>{this.sortbyPostingDate()}} style={{paddingLeft:'5px', color:'black'}}>Posting Date Ascending</Dropdown.Item><br />
                                            <Dropdown.Item onClick={()=>{this.sortbyPostingDatedesc()}} style={{paddingLeft:'5px', color:'black'}}>Posting Date Descending</Dropdown.Item><br />
                                            <Dropdown.Item onClick={()=>{this.sortbyDeadline()}} style={{paddingLeft:'5px', color:'black'}}>Deadline Ascending</Dropdown.Item><br />
                                            <Dropdown.Item onClick={()=>{this.sortbyDeadlinedesc()}} style={{paddingLeft:'5px', color:'black'}}>Deadline Descending</Dropdown.Item><br />
                                            </div>
                                        </DropdownButton>
                                </div>
                            </div>
                            <hr style={{ width: '100%',marginTop:'10px' }}></hr>

                            {joblist.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((job, index) => {
                                //{joblist.map((job, index) => {
                                return (<div >
                                    <Link onClick={() => this.showJob(((this.state.page*this.state.rowsPerPage)+index),job.companydetails[0]._id)} style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                                        <div class="col-md-2" style={{ marginTop: '10px', position:'relative', left:'10px' }}><Avatar src={ this.state.emptyprofilepic} style={{ height: '50px', width: '50px', borderRadius: '0px', position: 'relative', left: '-20px' }} >DP</Avatar></div>
                                        <div class="col-md-10" style={{ marginBottom: '16px' }}>
                                            <p style={{ fontSize: '16px', fontWeight: '700' }}>{job.title}</p>
                                            <p style={{ fontSize: '16px', fontWeight: '400' }}>{job.companydetails[0].name}-{job.location}</p>
                                            <p style={{ fontSize: '14px', fontWeight: '400' }}>{job.category}</p></div>
                                        <hr style={{ width: '100%' }}></hr>
                                    </Link>
                                </div>
                                )
                            })}
                        </div>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={joblist.length}
                            rowsPerPage={this.state.rowsPerPage}
                            page={this.state.page}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </div>
                )
                jobdetailed = joblist[this.state.jobindex]
                console.log(jobdetailed)
                console.log(this.state.studentId)
                if (jobdetailed.applications) {
                    
                    applications = jobdetailed.applications.find(app => app.studentId === this.state.studentId)
                }
                console.log(applications)
                if (applications) {
                    jobapplybutton = <div style={{ fontSize: '16px', fontWeight: '500', color: 'rgba(0,0,0,.8)', position: 'relative', top: '-12px', border: '0px' }}>Applied</div>
                } else {
                    jobapplybutton = <div><button class="btn btn-primary" style={{ backgroundColor: '#0d7f02', position: 'relative', top: '-18px', border: '0px' }} onClick={() => this.applyJob( jobdetailed._id, jobdetailed.company_id )}>Quick Apply</button></div>
                }
                detailedjob = (
                    <div>
                        <div style={{ float: "left", position: 'relative', left: '10px', top: '-20px' }}><img src={jobdetailed.companydetails[0].image ? jobdetailed.companydetails[0].image : this.state.emptyprofilepic} height='70px' width='70px' style={{ position: 'relative', top: '20px', left: '-30px' }} alt='Profile' /></div>
                        <div><p style={{ fontSize: '24px', fontWeight: '500', color: 'rgba(0, 0, 0, 0.8)' }}>{jobdetailed.title}</p>
                            <Link to = {'/company/viewprofile'}><p style={{ fontSize: '18px', fontWeight: '500', color: 'rgba(0, 0, 0, 0.8)' }}>{jobdetailed.companydetails[0].name}</p></Link>
                            <div class="row" style={{ position: 'relative', left: '85px' }}>
                                <div class="col-md-3" style={{ padding: "0px" }}>
                                    <div style={{ fontSize: "13px" }}><span class="glyphicon glyphicon-map-marker" style={{ color: "#1569E0" }}></span> {jobdetailed.location}</div>
                                </div> <div class="col-md-3" style={{ padding: "0px" }}>
                                    <div style={{ fontSize: "13px" }}><span style={{ color: "#1569E0" }}><CategoryIcon /></span> {jobdetailed.category}</div>
                                </div> <div class="col-md-3" style={{ padding: "0px" }}>
                                    <div style={{ fontSize: "13px" }}><span class="glyphicon glyphicon-usd" style={{ color: "#1569E0" }}></span> {jobdetailed.salary + " per hour"}</div>
                                </div></div>
                            <p style={{ fontSize: '14px', fontWeight: '400', color: 'rgba(0,0,0,.56)', marginTop: '16px' }}>Posted on {jobdetailed.posting_date.slice(0,10)}</p></div>
                        <div style={{ border: 'Solid 1px', borderRadius: '5px', padding: '30px', marginBottom: '24px' }}>
                            <div class='col-md-9'>
                                <p style={{ fontSize: '16px', fontWeight: '500', color: 'rgba(0,0,0,.8)', position: 'relative', top: '-12px', left: '-15px' }}>Applications close on {jobdetailed.deadline}</p></div>
                            <div class='col-md-3'>
                                {jobapplybutton}
                            </div>
                            <Dialog
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.uploadresume}>
                                <div>
                                    <h2 id="simple-modal-title">Upload Resume</h2>
                                    <DialogContent>
                                        <div style={{ border: 'solid 1px', borderRadius: '5px', height: '50px', width: '97%', padding: '15px 0px 0px 20px', marginBottom: '15px' }}>
                                            <input type="file" name="resume" onChange={this.getResume} />
                                        </div>
                                        <div className='col-md-8'>
                                        </div>
                                        <div className='col-md-4'>
                                            <button onClick={() => { this.applyJob(jobdetailed._id, jobdetailed.company_id) }} class="btn btn-primary" style={{ backgroundColor: '#1569E0', borderRadius: '5px' }}>Apply</button>
                                        </div>
                                    </DialogContent>
                                </div>
                            </Dialog>
                        </div>
                        <div >
                            <h2 style={{ fontSize: '27px', fontWeight: 'bold', textDecoration: 'underline', color: 'rgba(0, 0, 0, 0.8)' }}>{jobdetailed.title}</h2>
                            <p style={{ lineHeight: '20px', fontSize: '16px' }}>{jobdetailed.description}</p>
                        </div>
                    </div>
                )
            }
        }
        return (
            <div>
                <StudentNav comp="jobsearch" />
                <div style={{ paddingLeft: '5%', paddingRight: '5%', fontFamily: 'Arial' }}>
                    <Card>
                        <CardContent>
                            <div style={{ paddingBottom: '40px', marginBottom: '13px' }}>
                                <div class="active-pink-4 mb-4" style={{ width: "50%", float: "left" }}>
                                    <input class="form-control" type="text" name="namesearch" id="namesearch" style={{ width: "80%", }} placeholder="Job titles or Employers" aria-label="Job titles or Employers" onChange={this.inputChangeHandler} />
                                </div>
                                <div class="active-pink-4 mb-4" style={{ width: "50%", float: "right" }}>
                                    <input class="form-control" type="text" name="locsearch" id="locsearch" style={{ width: "80%", }} placeholder="Location" aria-label="Location" onChange={this.inputChangeHandler} />
                                </div>
                            </div>
                            <div style={{ marginTop: '13px' }}>
                                <Button variant="outlined" color="primary" href="#outlined-buttons" style={{ height: "35px", borderRadius: "20px", marginRight: "5px" }} onClick={() => this.jobFliter("Full Time")}>Full-Time Job</Button>
                                <Button variant="outlined" color="primary" href="#outlined-buttons" style={{ height: "35px", borderRadius: "20px", marginRight: "5px" }} onClick={() => this.jobFliter("Part Time")}>Part-Time</Button>
                                <Button variant="outlined" color="primary" href="#outlined-buttons" style={{ height: "35px", borderRadius: "20px", marginRight: "5px" }} onClick={() => this.jobFliter("Internship")}>Internship</Button>
                                <Button variant="outlined" color="primary" href="#outlined-buttons" style={{ height: "35px", borderRadius: "20px", marginRight: "5px" }} onClick={() => this.jobFliter("On Campus")}>On-Campus</Button>
                            </div>
                        </CardContent>
                    </Card>
                    <div style={{ padding: '24px 0px 16px' }}>
                        <div class="col-md-4" style={{ paddingRight: '16px' }}>
                            <Card style={{ width: '101%' }}>
                                <CardContent>
                                    {sortfilter}
                                    {jobs}
                                </CardContent>
                            </Card>
                        </div>
                        <div class="col-md-8" style={{ padding: '0px' }}>
                            <Card style={{ padding: '40px 40px' }}><CardContent>{detailedjob}</CardContent></Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default compose(withApollo,
    graphql(alljobs, {
   options: {
       variables: { }
   }
}),)(JobSearch)