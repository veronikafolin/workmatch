const mongoose = require('mongoose');

const JobOfferSchema = new mongoose.Schema({
    from: {type: mongoose.Schema.Types.ObjectId},
    timestamp: {type: String},
    position: {type: String},
    description: {type: String},
    place_of_work: {type: String},
    working_hours: {type: Number},
    curriculums_requested: {type: [String]}
});

module.exports = mongoose.model('JobOffer', JobOfferSchema);
