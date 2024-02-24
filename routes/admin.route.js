const express = require("express");
const router = express.Router();
const {isAuth, allowedTo} = require('../middileware/authentications.js')
const {localUser, googleUser} = require('../models/user.model');

router.get('/',isAuth,allowedTo('ADMIN'),async(req,res)=>{
    const localusers = await localUser.find()
    const googleusers = await googleUser.find()
    res.render('admin/admin-panel',{
        localusers,
        googleusers,
    })
})
router.get('/delete_user/:id',isAuth,allowedTo('ADMIN'),async(req,res)=>{
    const id = req.params.id
    let user = await localUser.findById(id)
    if(user) {
        await localUser.deleteOne({_id:id})
        return res.redirect('/admin')
    }else{
        await googleUser.deleteOne({_id:id})
        return res.redirect('/admin')
    }
})




module.exports = router;