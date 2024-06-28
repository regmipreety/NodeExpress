const User = require('../models/user')
const jwt = require('jsonwebtoken')

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { email:'', password:''}

    if(err.code === 11000) {
        errors.email = 'Email is already registered'
        return errors 
    }
    //incorrect email
    if(err.message === 'incorrect email'){
        errors.email = "That email is not registered"
    }
     //incorrect password
     if(err.message === 'incorrect password'){
        errors.password = "Please enter correct password"
    }


    //validation errors
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(properties => {
            errors[properties.path] = properties.message
        })
    }
    return errors;
}
const maxAge = 3 * 24 * 60 * 60 //seconds in 3 days
const createToken = (id)=>{
    return jwt.sign({ id }, 'my secret key', {
        expiresIn: maxAge
    })
}

const signup_get = (req, res)=>{
    res.render('login/signup', {title: 'Sign up'})
}

const signup_post = async (req, res)=> {
    const { email, password } = req.body;
   // const user = new User(req.body)

    try {
          // Create a new User instance with Mongoose
        const user = await User.create({ email , password });
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
    
        // Save the user to the database
      // const data = await user.save()
        res.status(201).json({user: user._id});
            
    } 
    catch (err){
        const errors = handleErrors(err)
        res.status(400).json({errors});
    }
}

const login_get = (req, res)=>{
    res.render('login/login', {title: 'Log in'})
}
const login_post = async (req, res)=>{
    const { email, password } = req.body;

     try {
           const user = await User.login(email, password)
           const token = createToken(user._id)
           res.cookie('jwt', token, { htppOnly: true, maxAge: maxAge * 1000})
           res.status(200).json({user: user._id})      
     } 
     catch (err){
        const errors = handleErrors( err)
         res.status(400).json({errors})
     }
}

const logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/')
}

module.exports = {
    signup_get, signup_post, login_get , login_post, logout_get
}