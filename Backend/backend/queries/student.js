const query = require('../Database/queries');
var ObjectId = require('mongodb').ObjectID;
const Students = require('../Models/StudentModel');

const ViewStudent = async (details) => {
    console.log(details)
    try {
        return await query.getProfile(Students.createModel(), { _id: ObjectId(details.studentId) }
        );
    }
    catch (error) {
        return error
    }
}

const ViewAllStudents = async (details) => {

    try {
        let filter = {}
        if (details.studentId !== ""){
            filter = { _id: {$ne:ObjectId(details.studentId)} }
        }

        return await query.getStudents(Students.createModel(),filter);
    }
    catch (e) {
        console.log(e)
        return e
    }
}


exports.ViewStudent = ViewStudent;
exports.ViewAllStudents = ViewAllStudents;

