const express = require('express')

const router = express.Router();

const authController = require('../controllers/authController')

const adminController = require('../controllers/adminController')

const {isAuthenticatedUser} = require('../middleware/isAuthenticatedUser')

 //Get all routes
 router.get('/signup', authController.signup_get)

 router.get('/login', authController.login_get)

 router.post('/signup', authController.signup_post)

 router.post('/login', authController.login_post)

 router.get('/logout', authController.logout_get)

 //AdminController
router.get('/dashboard', isAuthenticatedUser, adminController.dashboard)

 router.get('/admin/register', adminController.get_register)

 router.post('/admin/register', adminController.post_register)

 router.get('/admin/login', adminController.get_signin)

 router.post('/admin/login', adminController.post_login)

module.exports = router