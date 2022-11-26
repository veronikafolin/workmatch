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
        type: { type: String }
    }
});
module.exports = mongoose.model('Student', StudentSchema);
