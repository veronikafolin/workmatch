const mongoose = require('mongoose');

var CompanySchema = new mongoose.Schema({
    _id: {type : mongoose.Schema.Types.ObjectId},
    name: { type: String },
    city: { type: String},
    address: { type: String},
    description: { type: String},
    phone_number: {type: String},
    email: {type: String}, 
    job_offers: {type: [{
        id: {type : mongoose.Schema.Types.ObjectId},
        position: {type: String},
        description : {type: String},
        place_of_work: {type: String},
        working_hours: {type: Number},
        curriculums_requested: {type: [String]}
    }]}, 
    notifications: {type: [{
        from: {type : mongoose.Schema.Types.ObjectId},
        timestamp : {type: Date, default: Date.now},
        message: {type: String}
    }]}
});

module.exports = mongoose.model('Company', CompanySchema);
