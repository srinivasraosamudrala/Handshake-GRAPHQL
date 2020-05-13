const Student = require('../Models/StudentModel');
const query =require('../Database/queries');


handle_request=(msg, callback)=>{
    console.log(msg)
    try{
        query.saveDocuments(Student.createModel(),msg,{runValidators:false}, (err,rows) => {
                    callback(err,rows)
                });
    }
    catch(e)
    {
       callback(e,null)
    }
}

exports.handle_request = handle_request;