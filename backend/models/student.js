const mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
    email: { type: String }, 
    name: { type: String },
    surname: { type: String },
    username: { type: String }, 
    password: { type: String },
    salt: { type: String },
    grade: { type: String },
    school: {
        name: { type: String },
        type: { type: String },
        curriculum : { type : String }
    },
    jobs: {
        company: { type: String },
        role: { type: String },
        sector: { type: String },
        duration: { type: String }
    }
});
module.exports = mongoose.model('Student', StudentSchema);
