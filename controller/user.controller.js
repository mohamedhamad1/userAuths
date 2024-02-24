const {validationResult} = require('express-validator');
const {localUser} = require('../models/user.model');
const bcrypt = require('bcrypt')
const homePage = async(req, res)=>{
    res.render('home')
}
const loginPage = async(req, res)=>{
    res.render('user/login',{
        errors: req.flash('errors'),
        error: req.flash('error'),
        success: req.flash('success')
    })
}
const signupPage = async(req, res)=>{
    res.render('user/signup',{
        errors: req.flash('errors'),
        error: req.flash('error'),
    })
}
const registeration = async(req, res)=>{
    try {
        const {username, email, password, confirm_password}= req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            req.flash('errors',errors.array());
            return res.redirect('/signup')
        }
        if(password!==confirm_password){
            req.flash('error','passwords do not match')
            return res.redirect('/signup')
        }
        const user = await localUser.findOne({$or:[
            {email: email},
            {username:username}
        ]})
        if(user){
            req.flash('error','user already exists')
            return res.redirect('/signup')
        }
        const newUser = localUser({
            username,
            email,
            password: await bcrypt.hash(password,10)
        })
        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        console.log(error);
    }
}
const logout = async(req,res)=>{
    req.logout(()=>{
        res.redirect('/login')
    });
}
const profilePage = async(req,res)=>{
    res.render('user/profile')
}
module.exports ={
    loginPage,
    homePage,
    signupPage,
    registeration,
    profilePage,
    logout
}