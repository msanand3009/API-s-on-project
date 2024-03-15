const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    name: String,
    mobileNumber: String,
    emailAddress: String,
    
});

module.exports = mongoose.model('Profile', profileSchema);