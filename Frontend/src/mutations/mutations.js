import { gql } from 'apollo-boost';
const addJob = gql`
mutation addJob(
    $title:String,
    $posting_date:String,
    $deadline:String,
    $location:String,
    $salary:String,
    $description:String,
    $category:String,
    $companyId:String){
        addJob(
        title: $title,
        posting_date: $posting_date,
        deadline: $deadline,
        location: $location,
        salary: $salary,
        description: $description,
        category: $category,
        companyId:$companyId){
            title,posting_date,deadline,location,salary,description,category
   }
}
`;
const addCompany = gql`
mutation addCompany(
    $name:String,
    $email:String,
    $password:String,
    $location:String
){
    addCompany(
    name: $name
     email: $email,
     password: $password,
     location: $location){
     _id,email,location,name
 }}
`;
const updateCompany = gql`
mutation updateCompany(
    $name:String,
    $location:String,
    $description:String,
    $company_id:String){
    updateCompany(
        name: $name,
        company_id: $company_id,
        location: $location,
        description: $description){
            email,location,description,name}
 }
`;
const addStudent = gql`
mutation addStudent(
    $first_name:String,
    $last_name:String,
    $email:String,
    $password:String,
    $college:String
)
{
        addStudent(
        first_name: $first_name,
        last_name: $last_name,
        email: $email,
        password: $password,
        college: $college)
        {
            _id,first_name,last_name,email,college
        }  
}
 `;
// const updateStudent = gql`
// mutation{
//     updateStudent(  name: "sreeja",
//          email: "sreeja@gmail.com(opens in new tab)",
//          college: "sreeja",
//          dob: "sreeja",
//          city: "sreeja",
//          state: "sreeja",
//          country: "sreeja",
//          career_objective:"abc",
//          id:"5eb2ab62127c303c8c64a21c",
//    type:"career"){
//      name,email,college,dob,career_objective}
//  }
// `;
const updateStudentCareer = gql`
mutation updateStudent( 
    $career_objective:String,
    $id:String
){
        updateStudent( 
            career_objective:$career_objective,
            id:$id,
            type:"career"){
                status,message}
 }
`;

const updateStudentProfile1 = gql`
mutation updateStudent( 
    $first_name:String,
    $last_name:String,
    $id:String){
    updateStudent( 
        first_name:$first_name,
        last_name:$last_name,
        id:$id,
        type:"profile1"){
        status,message}
    }
`;

const updateStudentBasic = gql`
mutation updateStudent(
    $email:String,
    $mobile:String,
    $dob:String,
    $state:String,
    $city:String,
    $country:String,
    $id:String){
    updateStudent( 
        email:$email,
        mobile:$mobile,
        dob:$dob
        state:$state,
        city:$city,
        country:$country,
        id:$id,
        type:"basic"){
            status,message}
    }
`;
const updateStudentEducation = gql`
mutation 
    updateStudentEducation( 
        $college_name:String,
        $location:String,
        $degree:String,
        $major:String,
        $cgpa:String,
        $year_of_starting:Int,
        $month_of_starting:Int,
        $year_of_passing:Int,
        $month_of_passing:Int,
        $id:String,
        $educationId:String
){
    updateStudentEducation(
        college_name:$college_name,
        location:$location,
        degree:$degree,
        major:$major,
        cgpa: $cgpa,
        year_of_starting:$year_of_starting,
        month_of_starting:$month_of_starting,
        year_of_passing:$year_of_passing,
        month_of_passing:$month_of_passing,
        id:$id,
        educationId:$educationId
        type:"education"){status,message}
 }
`;
const updateStudentExperience = gql`
mutation updateStudentExperience(
    $company: String,
    $location: String,
    $title: String,
    $description: String,
    $year_of_starting: Int,
    $month_of_starting: Int,
    $year_of_ending: Int,
    $month_of_ending: Int,
    $id:String,
    $experienceId:String
){
    updateStudentExperience( 
    company: $company,
    location: $location,
    title: $title,
    description: $description,
    year_of_starting: $year_of_starting,
    month_of_starting: $month_of_starting,
    year_of_ending: $year_of_ending,
    month_of_ending: $month_of_ending
    id:$id,
    experienceId:$experienceId,
    type:"experience"){
     status,message
 }
}
`;
const applyJob = gql`
mutation applyJob( 
    $job_id:String,
    $stud_id:String,
    $app_date:String){
    applyJob( 
        job_id:$job_id,
        stud_id:$stud_id,
        app_date:$app_date){status,message}
 }
`;
const changeJobStatus = gql`
mutation changeJobStatus( 
    $jobId:String,
    $studentId:String,
    $status:String){
    changeJobStatus( 
        jobId:$jobId,
        studentId:$studentId,
        status:$status
   ){status,message}
 }
`;
const companyLogin = gql`
mutation companyLogin($email:String,$password:String){
    companyLogin(email:$email,password:$password){
      _id
    }
  }
`;
const studentLogin = gql`
mutation studentLogin($email:String,$password:String){
    studentLogin(email:$email,password:$password){
      _id
    }
  }
`;
export {changeJobStatus,applyJob,addJob,addCompany,updateCompany,addStudent,updateStudentCareer,updateStudentBasic,updateStudentEducation,updateStudentExperience,companyLogin,studentLogin, updateStudentProfile1};