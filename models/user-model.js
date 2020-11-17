require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    registeredDate: { type: Date, default: Date.now },
    avatar: String,
    token: String
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_LENGTH));
    }
    next();
})

userSchema.pre('update', async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(use.password, process.env.BCRYPT_SALT_LENGTH);
    }
    next();
})

module.exports = mongoose.model(`Users`, userSchema, `Users`);