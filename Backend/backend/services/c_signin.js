const query =require('../Database/queries');
const Company = require('../Models/CompanyModel');

handle_request=(cmpny_details, callback)=>{
    console.log(cmpny_details)
    try{
        query.findDocumentsByQuery(Company.createModel(),{email:cmpny_details.email,password:cmpny_details.password}, (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};

exports.handle_request = handle_request;


