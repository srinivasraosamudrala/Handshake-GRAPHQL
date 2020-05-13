import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the Student Home Component
class StudentNav extends Component {
    constructor(props){
        super(props);
        this.state = {
            activenav : "jobsearch"
        }
    }
    changeActivenav = (e) => {
        this.setState({
            activenav : e.target.value
        })
        console.log(this.state)
    }
    render(){
        let navHeader = null;
        let navUpdate = null;
        if (sessionStorage.getItem('studentId')){
            if(this.props.comp === "jobapplications")
            {
                navUpdate = (
                    <div>
                        <ul class="nav navbar-nav navbar-right">
                            <li class='navli'><Link to="/student/jobs/search">Job Search</Link></li>
                            <li class = "active" ><Link to="/student/jobs/applications">Applications</Link></li>
                        </ul>
                    </div>
                );
            }else if(this.props.comp === "jobsearch"){
                navUpdate = (
                    <div>
                        <ul class="nav navbar-nav navbar-right">
                            <li class = "active"><Link to="/student/jobs/search">Job Search</Link></li>
                            <li class='navli'><Link to="/student/jobs/applications">Applications</Link></li>
                        </ul>
                    </div>
                );
            }
            else if(this.props.comp === "studentsearch"){
                navUpdate = (
                    <div>
                        <ul class="nav navbar-nav">
                            <h2 style={{color:"white",fontSize:'20px',fontWeight:'500'}}>Explore Students</h2>
                        </ul>
                    </div>
                );
            }
            else if(this.props.comp === "Messages"){
                navUpdate = (
                    <div>
                        <ul class="nav navbar-nav">
                            <h2 style={{color:"white",fontSize:'20px',fontWeight:'500'}}>Messages</h2>
                        </ul>
                    </div>
                );
            }
            else if(this.props.comp === "events"){
                navUpdate = (
                    <div>
                        <ul class="nav navbar-nav navbar-right">
                            <li class = "active"><Link to="/student/events">Event Search</Link></li>
                            <li class='navli'><Link to="/student/event/registrations">Registrations</Link></li>
                        </ul>
                    </div>
                );
        }
        else if(this.props.comp === "eventregistrations"){
            navUpdate = (
                <div>
                    <ul class="nav navbar-nav navbar-right">
                        <li class='navli'><Link to="/student/events">Event Search</Link></li>
                        <li class = 'active'><Link to="/student/event/registrations">Registrations</Link></li>
                    </ul>
                </div>
            );
    }}
        
        return(
            <div>
                <nav class="navbar navbar-inverse" style={{position:"relative",top:'-20px',borderRadius:'0px',backgroundColor:'#0F1035'}}>
                    <div class="container-fluid">
                        {navHeader}
                        {navUpdate}
                    </div>
                </nav>
            </div>
        )
    }}


export default StudentNav;