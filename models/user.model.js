const mongoose = require('mongoose');
const localUserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: 'USER'
    }
})
const googleUserSchema = mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type: String,
        default:'email'
    },
    googleId:{
        type:String,
    },
    role:{
        type: String,
        default: 'USER'
    }
})
const localUser = mongoose.model('localUser', localUserSchema);
const googleUser = mongoose.model('googleUser', googleUserSchema);
module.exports ={
    localUser,
    googleUser
}