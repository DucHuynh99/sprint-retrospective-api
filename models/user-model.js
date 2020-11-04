const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    registeredDate: { type: Date, default: Date.now },
    avatar: String
});

module.exports = mongoose.model(`Users`, userSchema, `Users`);