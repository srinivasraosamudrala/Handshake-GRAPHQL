import { gql } from 'apollo-boost';
const jobs = gql`
query jobs($companyId:String){
    jobs(companyId: $companyId){
      title, posting_date,description
    }
  }
`;
const alljobs = gql`
query alljobs{
    alljobs{
      _id, title, posting_date, description, companydetails{name}, deadline, salary, location, category, applications{studentId,status,appliedDate}
    }
  }
`;
const jobdetails = gql`
query jobdetails($jobId:String){
    jobdetails(jobId:$jobId){
      title, posting_date,description,companydetails{name,email}
    }
  }
`;
const company = gql`
query company($companyId:String){
    company(companyId:$companyId){
      name,email,location,description
    }
  }
`;
const student = gql`
query student($studentId:String){
    student(studentId:$studentId){
      first_name,last_name,email,college,dob,city,state,country,career_objective,
      education
      {
          _id,college_name,location,degree,major,cgpa,year_of_starting,month_of_starting,year_of_passing,month_of_passing
      },
      experience
      {
        _id,company,title,location,description,year_of_starting,month_of_starting,year_of_ending,month_of_ending
      }
    }
  }
`;
const allStudents = gql`
query allStudents($studentId:String){
    allStudents(studentId:$studentId)
    {
      first_name,last_name,college,email,college,_id,education{major,degree}
    }
  }
`;
const listAppliedJobs = gql`
query listAppliedJobs($studentId:String){
    listAppliedJobs(studentId:$studentId){
      _id,title,deadline, companydetails{name,email},applications{_id,studentId,status,appliedDate}
    }
  }
`;
const listApplicants = gql`
query listApplicants($jobId:String){
    listApplicants(jobId:$jobId){
      _id,title,location,salary,applications{studentId,status,appliedDate},
      listApplicants{_id,first_name,last_name,email,college}
    }
  }
`;
export { jobs, alljobs, jobdetails, company, student, allStudents , listApplicants,  listAppliedJobs};