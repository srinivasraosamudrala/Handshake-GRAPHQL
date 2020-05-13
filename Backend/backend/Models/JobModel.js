const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// autoIncrement = require('mongoose-auto-increment');

const jobSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    id: { type: String, required: false },
    companyId:{ type: mongoose.Schema.Types.ObjectId, required: true},

    title: { type: String, required: true },
    posting_date: { type: String, required: true },
    deadline: { type: String, required: true },
    location: { type: String, required: false },
    salary: { type: String, required: false },
    description: { type: String, required: false },
    category: { type: String, required: false },
    applications: [
        {
            studentId: mongoose.Schema.Types.ObjectId,
            status: String,
            appliedDate: String
        }
    ]
}, { _id: false }, { collection: 'jobs' });

const createModel = function () {
    return mongoose.model("jobs", jobSchema)
}
module.exports.createModel = createModel;