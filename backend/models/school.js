const mongoose = require('mongoose');

var SchoolSchema = new mongoose.Schema({
    _id: {type : mongoose.Schema.Types.ObjectId},
    name: { type: String },
    city: { type: String},
    type: { type: String},
    curriculums: {type: [String]},
    phone_number: {type: String},
    email: {type: String}
});

module.exports = mongoose.model('School', SchoolSchema);
