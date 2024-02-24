const isAuth = async(req,res,next)=>{
    if(req.user){
        return next()
    }
    res.redirect('/')
}
const allowedTo = (...roles)=>{
    return(req,res,next)=>{
        if(roles.includes(req.user.role)){
            return next()
        }
        res.redirect('/');
    }
}
const notAuth = async(req,res,next)=>{
    if(!req.user){
        return next()
    }
    res.redirect('/')
}
module.exports = {
    isAuth,
    allowedTo,
    notAuth
}