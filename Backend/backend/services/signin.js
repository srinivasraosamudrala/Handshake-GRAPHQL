const Student = require('../Models/StudentModel');
const query =require('../Database/queries');


handle_request=(stud_details, callback)=>{
    console.log(stud_details)
    try{
        query.findDocumentsByQuery(Student.createModel(),{email:stud_details.email,password:stud_details.password}, (err,rows) => {
            callback(err,rows)
        });
    }
    catch(e)
    {
       callback(e,null)
    }
};

exports.handle_request = handle_request;


