import React,{ Component } from 'react';
import {Route} from 'react-router-dom';
import Navbar from './LandingPage/Navbar';
import studentLogin from './student/login';
import studentSignup from './student/signup';
import studentProfile from './student/profile';
import companyLogin from './company/login';
import companySignup from './company/signup';
import companyHome from './company/home';
import companyProfile from './company/profile';
import companypostJob from './company/postJob';
import studentJobApplications from './student/jobapplications';
import studentJobSearch from './student/jobsearch';
import studentSearch from './student/studentsearch';
import companyApplicants from './company/applicants';
import viewStudents from './student/viewstudent';
import companyViewStudents from './company/viewstudent';
import companyStudentSearch from './company/studentsearch';
import companyviewProfile from './company/companyview';



class Main extends Component{
    render(){
        return(
            <div>
                    <Route path = "/" component = {Navbar} />
                    <Route path="/student/login"  component={studentLogin}/>
                    <Route path="/student/signup" component={studentSignup}/>
                    <Route path="/student/profile" component={studentProfile}/>
                    <Route path="/company/login"  component={companyLogin}/>
                    <Route path="/company/signup" component={companySignup}/>
                    <Route path="/company/home"   component={companyHome}/>
                    <Route path="/company/postjob" component={companypostJob}/>
                    <Route path="/company/profile" component={companyProfile}/>
                    <Route path="/company/viewprofile" component={companyviewProfile}/>
                    <Route path="/company/applicants/:jobId" component={companyApplicants}/>
                    <Route path="/company/viewStudent" component = {companyViewStudents}/>
                    <Route path="/company/studentSearch" component = {companyStudentSearch}/>
                    <Route path="/student/jobs/search" component={studentJobSearch}/>
                    <Route path="/student/jobs/applications" component = {studentJobApplications}/>
                    <Route path="/student/studentsearch" component={studentSearch}/>
                    <Route path="/student/viewStudent" component = {viewStudents}/>
            </div>
        )
    }
}

export default Main;