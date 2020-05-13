const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    // id: { type: String, required: false },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: false },
}, { _id: false }, { collection: 'company' });

const createModel = function () {
    return mongoose.model("company", companySchema)
}

module.exports.createModel = createModel;