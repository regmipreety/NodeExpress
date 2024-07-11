const Admin = require('../models/admin')
const express = require('express')
const app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

//middleware for passport
app.use(passport.initialize())
app.use(passport.session())

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

module.exports = {
    get_register, get_signin, dashboard, post_register
}