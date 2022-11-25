const mongoose = require('mongoose')

//module.exports = function(mongoose) {
    //var Schema = mongoose.Schema;
var StudentSchema = new mongoose.Schema({
    email:  String, 
    grade: String,
    name: String,
    school: {
        name: String,
        type: String
    },
    surname: String
});
module.exports = mongoose.model('Student', StudentSchema);
//};