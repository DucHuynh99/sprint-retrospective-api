const mongoose = require('mongoose');
const userModel = require('../models/user-model');
const tokenService = require('../services/token-service');
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client("656948797545-io59r3h73is40b8r755em4u5ghgntn21.apps.googleusercontent.com");
const axios = require('axios').default;

exports.register = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    if (await userModel.findOne({ email })) {
        res.status(400).send("Email is already taken");
        return;
    }
    const newUser = new userModel({ email: email, password: password, firstName: firstName, lastName: lastName });
    const { _id } = await newUser.save();
    if (_id) {
        res.status(201).send(tokenService.sign(_id));
    } else {
        res.status(500).send();
    }
}

exports.login = async (req, res) => {
    if (req.isAuthenticated()) {
        const { _id } = req.user;
        const token = tokenService.sign(_id);
        req.user.token = token;
        await req.user.save();
        res.status(200).send(token);
    }
}

exports.loginWithGoogle = async (req, res) => {
    const { tokenId } = req.body;
    const { payload } = await client.verifyIdToken({ idToken: tokenId, audience: "656948797545-io59r3h73is40b8r755em4u5ghgntn21.apps.googleusercontent.com" });
    const { email, email_verified, picture, given_name, family_name, jti } = payload;
    if (email_verified) {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            const token = tokenService.sign(existingUser._id);
            existingUser.token = token;
            console.log("Tai khoan da co trong DB", existingUser);
            await existingUser.save();
            res.status(200).send(token);
        } else {
            console.log("Them tai khoan vao DB");
            const newUser = new userModel({
                email: email,
                password: jti,
                firstName: given_name,
                lastName: family_name,
                avatar: picture,
            });
            const user = await newUser.save();
            const token = tokenService.sign(user._id);
            user.token = token;
            await user.save()
            res.status(200).send(token);
        }
    } else {
        res.status(404).send("Invalid user")
    }
}

exports.loginWithFacebook = async (req, res) => {
    const { id, accessToken } = req.body;
    try {
        const { data } = await axios.get(`https://graph.facebook.com/v9.0/${id}/?fields=first_name,last_name,picture,email&access_token=${accessToken}`);
        const { email, first_name, last_name, picture } = data;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            const token = tokenService.sign(existingUser._id);
            existingUser.token = token;
            console.log("Tai khoan da co trong DB", existingUser);
            await existingUser.save();
            res.status(200).send(token);
        } else {
            console.log("Them tai khoan vao DB");
            const newUser = new userModel({
                email: email,
                password: `${id}~+!${email}`,
                firstName: first_name,
                lastName: last_name,
                avatar: picture.data.url,
            });
            const user = await newUser.save();
            const token = tokenService.sign(user._id);
            user.token = token;
            await user.save()
            res.status(200).send(token);
        }
    } catch (error) {
        res.status(404).send("Invalid user")
    }
}

exports.getUserByID = async (req, res) => {
    const { userID } = req.params;
    const user = await userModel.findById(userID).select('-password');
    console.log(user);
    if (user) {
        res.status(200).send(user);
    } else {
        res.status(404).send();
    }
}

exports.update = async (req, res) => {
    const { userID, firstName, lastName } = req.body;
    await userModel.findByIdAndUpdate(userID, { firstName: firstName, lastName: lastName });
    res.status(200).send();
}