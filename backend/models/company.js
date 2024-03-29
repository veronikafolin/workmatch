const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: {type: String},
    username: {type: String},
    password: {type: String},
    salt: {type: String},
    address: {type: String},
    city: {type: String},
    description: {type: String},
    phone_number: {type: String},
    email: {type: String}
});

module.exports = mongoose.model('Company', CompanySchema);
