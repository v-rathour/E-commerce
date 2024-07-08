const express = require('express');
const routes = express.Router();
const User = require('../models/User')
const passport = require('passport');

routes.get('/singup',(req,res)=>{
    res.render('auth/singup');
})

routes.post('/singup',async (req,res)=>{
    try{
        let {username,email,password,role,img} = req.body;
        const user = new  User({username,email,role,img});
        req.flash('success',"Sign Up Successfully ");
        const NewUser = await User.register(user,password);
        req.login(NewUser,function(err){
            if(err){
                return next(err);
            }
            req.flash('success','You are register successful');
            return res.redirect('/products');
        })
    }
    catch(err){
        req.flash('error',err.message);
        return res.redirect('/singup')
    }
})


routes.get('/login',(req,res)=>{
    res.render('auth/login',{msg:req.flash('msg')});
})

routes.post('/login',
    passport.authenticate('local', { 
        failureRedirect: '/login',
        failureMessage:true 
    }),
  (req,res)=>{
    // console.log(req.user)
    req.flash('success',"Login successful!")
    res.redirect('/products')
  
})

routes.get('/logout',(req,res)=>{
    
    req.logout(function(err) {
        if (err) {
             return next(err); 
        }
    });
    
    req.flash('success',"Logout successful!");
    res.redirect('/products');
      
})



module.exports = routes;