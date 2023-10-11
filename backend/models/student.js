const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    email: {type: String},
    name: {type: String},
    surname: {type: String},
    username: {type: String},
    password: {type: String},
    salt: {type: String},
    grade: {type: String},
    school: {type: mongoose.Schema.Types.ObjectId},
    curriculum: {type: String},
    jobs: {
        company: {type: String},
        role: {type: String},
        sector: {type: String},
        duration: {type: String}
    }
});
module.exports = mongoose.model('Student', StudentSchema);
