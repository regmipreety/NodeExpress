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

const reset_password = (req, res)=>{
    Admin.findOne({resetPasswordToken: req.params.token, resetPasswordExpires : { $gt: Date.now()}})
        .then(user=>{
            if(!user) {
                req.flash('error_msg', 'Password reset toekn is invalid or expired')
                res.redirect('/forgot')
            }
            res.render('admin/changePassword', {token: req.params.token})
        })
        .catch(err=>{
            req.flash('error_msg', 'ERROR: '+ err)
            res.redirect('/forgot')
        })
}

const post_resetpassword =  async (req, res) =>{
    // async.waterfall([
    //     (done)=>{
    //        const user = await Admin.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}})
    //             .then(user => {
    //                 if(!user) {
    //                     req.flash('error_msg', 'Password reset token is invalid or expired')
    //                     res.redirect('/forgot')
    //                 }

    //                 if(req.body.password != req.body.confirmpassword){
    //                     req.flash('error_msg', 'Passwords do not match')
    //                     res.redirect('/forgot')
    //                 }

    //                 user.setPassword(req.body.password, err=>{
    //                     user.resetPasswordToken = undefined
    //                     user.resetPasswordExpires = undefined
                        
    //                     await user.save()

    //                 })
    //             })

    //             .catch(err=>{
    //                 req.flash('error_msg', 'Error:'+ err)
    //                 res.redirect('/forgot')
    //             })
    //         },
    //         (user) => {
    //             let smtpTransport = nodemailer.createTransport({
    //                 service: 'Gmail',
    //                 auth: {
    //                     user: process.env.GMAIL_EMAIL,
    //                     pass: process.env.GMAIL_PASSWORD
    //                 }
    //             })

    //             let mailOptions= {
    //                 to: user.email,
    //                 from: 'Node Express',
    //                 subject: 'Your password is changed',
    //                 text: 'Hello, '+user.name+'\n\n'+
    //                     'This is the confirmation that the password for your'+user.email+' account is changed successfully.'
    //             }
    //             smtpTransport.sendMail(mailOptions, err=>{
    //                 req.flash('success_msg', 'Your password has been changed successfully.')
    //                 res.redirect('/login')
    //             })
    //         }
    // ])

    try {
        const user = await Admin.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            req.flash('error_msg', 'Password reset token is invalid or has expired.');
            return res.redirect('/forgot');
        }

        if (req.body.password !== req.body.confirmpassword) {
            req.flash('error_msg', 'Passwords do not match.');
            return res.redirect('/forgot');
        }

        user.setPassword(req.body.password, async (err) => {
            if (err) {
                req.flash('error_msg', 'Error: ' + err.message);
                return res.redirect('/forgot');
            }

            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            await user.save();

            const smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.GMAIL_EMAIL,
                    pass: process.env.GMAIL_PASSWORD
                }
            });

            const mailOptions = {
                to: user.email,
                from: 'Node Express <noreply@gmail.com>',
                subject: 'Your password has been changed',
                text: `Hello, ${user.name}\n\nThis is a confirmation that the password for your account ${user.email} has been successfully changed.`
            };

            await smtpTransport.sendMail(mailOptions);

            req.flash('success_msg', 'Your password has been changed successfully.');
            res.redirect('/login');
        });
    } catch (err) {
        req.flash('error_msg', 'Error: ' + err.message);
        res.redirect('/forgot');
    }
}
    

module.exports = {
    get_register, get_signin, dashboard , post_register, post_login, get_logout,
    get_forgotpassword, post_forgotpassword, reset_password, post_resetpassword
}