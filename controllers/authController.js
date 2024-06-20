const User = require('../models/user')

const signup_get = (req, res)=>{
    res.render('login/signup', {title: 'Sign up'})
}

const signup_post = (req, res)=>{
    const { email, password } = req.body;
   // const user = new User(req.body)
    
    //Validate if username and password are provided
    if (!email || !password) {
        return res.status(400).send("Email and password are required");
    }

   // Create a new User instance with Mongoose
    const user = new User({ email , password });
    
    // Save the user to the database
    user.save()
        .then((result)=> {
            res.status(201).render('home', {title:"Welcome"})
        })
        .catch((err)=>{
            console.log(err);
            res.status(500).send("Failed to create user");
        });
}
const login_get = (req, res)=>{
    res.render('login/signup', {title: 'Log in'})
}
const login_post = (req, res)=>{
    res.render('login/signup', {title: 'Log in'})
}

module.exports = {
    signup_get, signup_post, login_get , login_post
}