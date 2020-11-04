const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    registeredDate: Date,
    avatar: String
});

module.exports = mongoose.model(`user`, userSchema, `Users`);