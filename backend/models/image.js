const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    of: {type: mongoose.Schema.Types.ObjectId},
    name: String,
    url: String,
    timestamp: Date
});

module.exports = mongoose.model('Image', imageSchema);