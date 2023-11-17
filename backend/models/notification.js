const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    from: {type: mongoose.Schema.Types.ObjectId},
    senderUsername: {type: String},
    to: {type: mongoose.Schema.Types.ObjectId},
    timestamp: {type: String},
    title: {type: String}
});

module.exports = mongoose.model('Notification', NotificationSchema);
