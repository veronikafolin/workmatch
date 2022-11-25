const mongoose = require('mongoose')

var StudentSchema = new mongoose.Schema({
    email:  String, 
    username: String, 
    password: String,
    grade: String,
    name: String,
    surname: String,
    school: {
        name: String,
        type: String
    }
});
module.exports = mongoose.model('Student', StudentSchema);
