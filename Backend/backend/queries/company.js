const query =require('../Database/queries');
// const Jobs = require('../Models/JobModel');
const Company = require('../Models/CompanyModel');
var ObjectId = require('mongodb').ObjectID;
// const Students = require('../Models/StudentModel');

const ViewCompany =async (cmpny_details)=>{
    console.log(cmpny_details)
    try{
       return await query.getProfile(Company.createModel(),{_id:ObjectId(cmpny_details.companyId)}
        );
    }
    catch(error){
        return error
    }
    }


   
      
exports.ViewCompany = ViewCompany;


