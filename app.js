const express = require("express");
const app = express();
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const UserRoutes = require('./routes/authRoutes')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');
const seedDB = require("./seed");
const methodOverride = require('method-override');
const productRoutes = require('./routes/productRoutes')
const reviewsRoutes = require('./routes/reviewRoutes')
const cartRoutes = require('./routes/cartRoutes')
const dotenv = require('dotenv');
dotenv.config();
    
mongoose
  .connect(process.env.mongodb_url)
  .then(() => {
    console.log("DB connected.");
  })
  .catch(() => {
    console.log("Error connecting");
  });

const sessionset = {
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        expire:Date.now()+ 7*24*60*60*1000,
        maxAge:7*24*60*60*1000
    }
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(flash());
app.use(session(sessionset));
app.use(methodOverride('_method'))


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()));

// locals flash 
app.use((req,res,next)=>{
    // console.log(req.user)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// seedDB()

// middelware for routers
app.use(productRoutes);//very very important route
app.use(reviewsRoutes);
app.use(UserRoutes);
app.use(cartRoutes);


app.listen(8000,()=>{
    console.log("listening on " +8000);
})