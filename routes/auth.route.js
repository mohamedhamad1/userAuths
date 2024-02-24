const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get('/google',
    passport.authenticate('google',{
        scope:['email','profile'],
        prompt:'select_account',
    })
)
router.get('/google/cb',
    passport.authenticate('google',{
        successRedirect:'/profile',
        failureRedirect:'/login',
    })
)



module.exports = router;