const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const googleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const {localUser, googleUser} = require('../models/user.model');
const { googleClientId, googleClientSec} = require('./config')

const ser_deser = async()=>{
    passport.serializeUser(async(user, done)=>{
        return done(null,user._id)
    })
    passport.deserializeUser(async(id, done)=>{
        const localuser = await localUser.findById(id)
        const googleuser = await googleUser.findById(id)
        if(localuser && !googleuser){
            return done(null,localuser)
        }else if(!localuser && googleuser){
            return done(null,googleuser)
        }
    })
}
const passportLocal = async()=>{
    passport.use(new localStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    },async(req,email, password, done)=>{
        try {
            const user = await localUser.findOne({email:email});
            if(!user){
                return done(null, false, req.flash('error','Invalid credentials'))
            }
            const isPassword = await bcrypt.compare(password, user.password)
            if(!isPassword){
                return done(null, false, req.flash('error','Invalid credentials'))
            }
            done(null, user);
        } catch (error) {
            console.log(error);
        }
    }))
    
}
const passportGoogle = async()=>{
    passport.use(new googleStrategy({
        clientID:googleClientId,
        clientSecret:googleClientSec,
        callbackURL:'http://localhost:15001/auth/google/cb'
    },async(accessToken, refreshToken, profile, done)=>{
        try {
            const user = await googleUser.findOne({googleId:profile.id})
            if(user){
                return done(null,user)
            }
            const newUser = new googleUser({
                username: profile.displayName,
                googleId:profile.id,
                email:profile._json.email
            })
            await newUser.save()
            done(null,newUser)
        } catch (error) {
            console.log(error);
        }
    }))
}

module.exports = {
    ser_deser,
    passportLocal,
    passportGoogle,

}