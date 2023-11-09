const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    from: {type: mongoose.Schema.Types.ObjectId},
    to: {type: mongoose.Schema.Types.ObjectId},
    timestamp: {type: Date, default: Date.now},
    title: {type: String},
    message: {type: String}
});

module.exports = mongoose.model('Notification', NotificationSchema);
