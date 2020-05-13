const query =require('../Database/queries');
const Company = require('../Models/CompanyModel');

handle_request=(cmpny_details, callback)=>{
    console.log(cmpny_details)
    try{
        query.saveDocuments(Company.createModel(),cmpny_details,{runValidators:false}, (err,rows) => {
                    callback(err,rows)
                });
    }
    catch(e)
    {
       callback(e,null)
    }
}

exports.handle_request = handle_request;