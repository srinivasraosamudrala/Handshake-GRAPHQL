const query = require('../Database/queries');
const Jobs = require('../Models/JobModel');
// const Company = require('../Models/CompanyModel');
var ObjectId = require('mongodb').ObjectID;
const Students = require('../Models/StudentModel');

const ViewJobs = async (cmpny_details) => {
    console.log(cmpny_details)
    try {
        return await query.findDocumentsByQuery(Jobs.createModel(), { companyId: cmpny_details.companyId }
        );
    }
    catch (error) {
        return error
    }
}


const ViewAllJobs = async (cmpny_details) => {
    console.log(cmpny_details)
    try {
        return await query.findDocumentsByLookup(Jobs.createModel(), 'companies', {});
    }
    catch (error) {
        return error
    }
}


const ViewJobDetails = async (cmpny_details) => {
    console.log(cmpny_details)
    try {
        return await query.findDocumentsByLookup(Jobs.createModel(), 'companies', { _id: ObjectId(cmpny_details.jobId) })
    }
    catch (error) {
        return error
    }
}
const listAppliedJobs = async (cmpny_details) => {
    console.log(cmpny_details.studentId)
    console.log(typeof (cmpny_details.studentId))
    try {
        return await query.findDocumentsByLookup(Jobs.createModel(), 'companies', { 'applications.studentId': ObjectId(cmpny_details.studentId) });
    }
    catch (error) {
        console.log(error)
        return error
    }
}

const listApplicants = async (cmpny_details) => {
    console.log(cmpny_details.jobId)
    try {
        return await query.getApplicantsforJob(Jobs.createModel(), 'students', { _id: ObjectId(cmpny_details.jobId) });
    }
    catch (error) {
        return error
    }
}

exports.ViewJobs = ViewJobs;
exports.ViewAllJobs = ViewAllJobs;
exports.ViewJobDetails = ViewJobDetails;
exports.listAppliedJobs = listAppliedJobs;
exports.listApplicants = listApplicants;

