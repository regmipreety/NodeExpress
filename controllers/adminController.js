const Admin = require('../models/admin')
const express = require('express')
const app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy({usernameField:'email'},Admin.authenticate()))
passport.serializeUser(Admin.serializeUser())
passport.deserializeUser(Admin.deserializeUser())

const get_register = (req, res)=>{
    res.render('admin/register')
}

const get_signin = (req, res)=>{
    res.render('admin/signin')
}

const dashboard = (req, res) => {
     res.render('admin/dashboard')
}

const post_register = (req, res)=>{
    let {name, email, password} = req.body

    let userData = {
        name: name,
        email: email
    }

    Admin.register(userData, password, (err, admin )=>{
        if(err){
            req.flash('error_msg', 'Error'+err)
            res.redirect('/admin/register')
        }

        passport.authenticate('local') (req,res, () =>{
            req.flash('success_msg','Account created successfully')
            res.redirect('/admin/login')
        })
    })

}

const post_login = (req, res, next)=>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/admin/login',
        failureFlash: ' Invalid email or password. Please try again! '
     })(req, res, next)
}

const get_logout = (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash('success_msg', 'You have been logged out');
      res.redirect('/admin/login');
    });
  };
  
module.exports = {
    get_register, get_signin, dashboard , post_register, post_login, get_logout
}