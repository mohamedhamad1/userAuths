const express = require("express");
const {port, mongo_uri} =require('./config/config')
const userRoutes = require('./routes/user.route.js');
const authRoutes = require('./routes/auth.route.js');
const adminRoutes = require('./routes/admin.route.js');
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const mongoose = require("mongoose");
const passport = require("passport");
mongoose.connect(mongo_uri)
    .then(()=>{console.log('connected to DB');})
    .catch((err)=>{console.log(err);})
const app = express();

//ejs template
app.set('view engine', 'ejs');

//static files
app.use(express.static('public'))
app.use(express.static('node_modules'))

//body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//flash
app.use(flash())

//session
app.use(session({
    secret:'qweqwe',
    resave: true,
    saveUninitialized: true,
    cookie:{maxAge:60000*15}
}));

//passport
app.use(passport.initialize());
app.use(passport.session());
const {passportLocal, passportGoogle, ser_deser} = require('./config/passport.config.js')
passportLocal()
passportGoogle()
ser_deser()

//set user info throgh routed
app.get('*',async(req,res,next)=>{
    res.locals.user = req.user || null;
    next();
})

//admin routes
app.use('/admin', adminRoutes)
//auth routes
app.use('/auth', authRoutes)
//default routes
app.use('/', userRoutes)

app.all('*', (req, res) => {
    return res.send('<h1>404 NOT FOUND</h1>');
})

app.listen( port, () => {
    console.log('listening on port', port);
})