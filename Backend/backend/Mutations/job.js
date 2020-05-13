const query =require('../Database/queries');
const Jobs = require('../Models/JobModel');
const Students = require('../Models/StudentModel');
var ObjectId = require('mongodb').ObjectID;

const addJob = (job_details)=>{
        console.log(job_details)
        try{
            let res = query.saveDocuments(Jobs.createModel(),job_details,{runValidators:false,});
            return { "status": 200, "message": "updated successfully" }
        }
        catch (error) {
            return {
                "status": error.status ? error.status : 500, "message": error.message ? error.message : "error while posting Job"
            }
        }
    }



const applyJob = async(cmpny_details)=>{
console.log(cmpny_details)
console.log(typeof(cmpny_details.job_id))
const update_data= { $push:{applications:[{
    studentId: ObjectId(cmpny_details.stud_id),
    status: 'Pending',
    appliedDate: cmpny_details.app_date
}]
}}
const update_stud_data= { $push:{applications:[{
 'jobId':ObjectId(cmpny_details.job_id)}]

}}
console.log(update_data)
try{
        let res = await query.updateField(Jobs.createModel(),{_id:ObjectId(cmpny_details.job_id)},update_data );
        console.log(res)
        await query.updateField(Students.createModel(),{_id:ObjectId(cmpny_details.stud_id)},update_stud_data)
        return { "status": 200, "message": "updated successfully" }
    }
    catch (error) {
        return {
            "status": error.status ? error.status : 500, "message": error.message ? error.message : "error while applying for job"
        }
    }
}


const changeJobStatus = async(job_details)=>{
    console.log(job_details.studentId)
    console.log(job_details.status)
    console.log(job_details.jobId)
    try{
        let res =  await query.editObj(Jobs.createModel(),{_id:ObjectId(job_details.jobId),'applications.studentId':ObjectId(job_details.studentId)},{'applications.$.status':job_details.status});
        return { "status": 200, "message": "updated successfully" }
    }
    catch (error) {
        return {
            "status": error.status ? error.status : 500, "message": error.message ? error.message : "error while updating application status"
        }
    }
}
exports.addJob = addJob;
exports.applyJob = applyJob;
exports.changeJobStatus = changeJobStatus;



