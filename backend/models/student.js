const mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
    email: { type: String }, 
    grade: { type: String },
    name: { type: String },
    username: { type: String }, 
    password: { type: String },
    school: {
        name: { type: String },
        type: { type: String }
    },
    surname: { type: String }
});
module.exports = mongoose.model('Student', StudentSchema);
