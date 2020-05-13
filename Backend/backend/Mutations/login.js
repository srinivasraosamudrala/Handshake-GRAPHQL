const Company = require('../Models/CompanyModel').createModel();
const Student = require('../Models/StudentModel').createModel();
const passwordHash = require('password-hash');
// const jwt = require('jsonwebtoken');
// const { secret } = require('../Database/config');

const studentLogin = async (args) => {
    let student = await Student.findOne({ email_id: args.email_id });
    console.log(student)
    if (student.length === 0) {
        return { status: 401, message: "NO_STUDENT" };
    }
    if (passwordHash.verify(args.password, student.password)) {
        // const payload = { _id: student._id, name: student.name, email: student.email };
        return { status: 200, _id: student._id };
    }
    else {
        return { status: 401, _id: "" };
    }
}

const companyLogin = async (args) => {
    let company = await Company.findOne({ email_id: args.email_id });
    console.log(company)
    if (company.length === 0) {
        return { status: 501, _id: "" };
    }
    if (passwordHash.verify(args.password, company.password)) {
        // const payload = { _id: company._id, name: company.name, email: company.email};
        return { status: 200, _id:company._id };
    }
    else {
        return { status: 502, _id: "" };
    }
}

exports.studentLogin = studentLogin;
exports.companyLogin = companyLogin;