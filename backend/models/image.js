const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    of: {type: mongoose.Schema.Types.ObjectId},
    name: String,
    // data: Buffer,
    url: String
});

module.exports = mongoose.model('Image', imageSchema);