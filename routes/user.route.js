const express = require("express");
const userController = require('../controller/user.controller.js');
const { check } = require('express-validator');
const passport = require("passport");
const router = express.Router();
const {isAuth, notAuth} = require('../middileware/authentications.js')

router.route('/')
    .get(userController.homePage)

router.route('/login')
    .get(notAuth,userController.loginPage)
    .post(notAuth,
        passport.authenticate('local', {
            successRedirect: '/profile',
            failureRedirect: '/login',
            failureFlash: true
        })
    )
router.route('/signup')
    .get(notAuth,userController.signupPage)
    .post(notAuth,[
        check('username').isLength({ min: 3 }).withMessage('username must be at least 3 characters'),
        check('password').isLength({ min: 8 }).withMessage('password must be at least 8 characters'),
        check('email').isEmail().withMessage('email must be a valid email address')
    ], userController.registeration
    )
router.route('/logout')
    .get(isAuth,userController.logout)
router.route('/profile')
    .get(isAuth,userController.profilePage)

module.exports = router;