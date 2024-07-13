const Admin = require('../models/admin')
const express = require('express')
const app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const crypto = require('crypto')
const async = require('async')
const nodemailer = require('nodemailer')

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

    Admin.register( userData, password, (err, admin )=>{
        console.log(err)
        if(err){
            req.flash('error_msg', 'Error'+err)
            res.redirect('/admin/register')
        }
        console.log(admin)
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

const get_forgotpassword = (req, res)=>{
    res.render('admin/forgotPassword')
}

const post_forgotpassword = (req, res, next) => {
    async.waterfall([
        (done) => {
            crypto.randomBytes(30, (err, buf) => {
                if (err) {
                    return done(err);
                }
                const token = buf.toString('hex');
                done(null, token);
            });
        },
        (token, done) => {
            Admin.findOne({ email: req.body.email })
                .then(user => {
                    if (!user) {
                        req.flash('error_msg', 'User does not exist with this email');
                        return res.redirect('/forgot');
                    }

                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 1800000; // 30 minutes

                    user.save()
                        .then(user => done(null, token, user))
                        .catch(err => done(err));
                })
                .catch(err => {
                    req.flash('error_msg', 'ERROR: ' + err);
                    res.redirect('/forgot');
                });
        },
        (token, user, done) => {
            const smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.GMAIL_EMAIL,
                    pass: process.env.GMAIL_PASSWORD
                }
            });

            const mailOptions = {
                to: user.email,
                from: 'Reset Password <noreply@gmail.com>',
                subject: 'Password Reset',
                text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                       Please click on the following link, or paste this into your browser to complete the process:\n\n
                       http://${req.headers.host}/reset/${token}\n\n
                       If you did not request this, please ignore this email and your password will remain unchanged.\n`
            };

            smtpTransport.sendMail(mailOptions, err => {
                if (err) {
                    return done(err);
                }
                req.flash('success_msg', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                res.redirect('/forgot');
                done();
            });
        }
    ], (err) => {
        if (err) {
            req.flash('error_msg', 'ERROR: ' + err);
            res.redirect('/forgot');
        }
    });
};

module.exports = {
    post_forgotpassword
};


module.exports = {
    get_register, get_signin, dashboard , post_register, post_login, get_logout,
    get_forgotpassword, post_forgotpassword
}