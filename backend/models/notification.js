const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    from: {type: mongoose.Schema.Types.ObjectId},
    senderUsername: {type: String},
    to: {type: mongoose.Schema.Types.ObjectId},
    timestamp: {type: String},
    title: {type: String},
    description: {type:String},
    aboutJobOffer: {type: mongoose.Schema.Types.ObjectId},
    read: {type: Boolean}
});

module.exports = mongoose.model('Notification', NotificationSchema);
