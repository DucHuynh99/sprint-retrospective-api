require('dotenv').config();

const passport = require("passport");
const passportjwt = require("passport-jwt");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const userModel = require("../models/user-model");


passport.use('jwt', new JWTStrategy(
    {
        jwtFromRequest: passportjwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRETKEY
    }
    , async (payload, done) => {
        console.log("payload received", payload);
        try {
            const user = await userModel.findById(payload.sub);
            if (user)
                return done(null, user);
            return done(null, false);
        } catch (error) {
            return done(error);
        }
    }));

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await userModel.findOne({ email });
        if (user && bcrypt.compareSync(password, user.password))
            return done(null, user);
        return done(null, false);
    } catch (error) {
        return done(error);
    }
}));

passport.use('google', new GoogleStrategy({
    clientID: process.env.Google_ClientID,
    clientSecret: process.env.Google_Secret,
    callbackURL: "/auth/google/callback"
}, (accessToken) => {
    console.log(accessToken);
}));
module.exports = passport;