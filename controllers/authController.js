const User = require('../models/user')

const signup_get = (req, res)=>{
    res.render('login/signup', {title: 'Sign up'})
}

const signup_post = async (req, res)=> {
    const { email, password } = req.body;
   // const user = new User(req.body)

    if (!email || !password) {
        return res.status(400).send("Email and password are required");
    }
    try {
          // Create a new User instance with Mongoose
        const user = new User({ email , password });
    
        // Save the user to the database
       const data = await user.save()
        res.status(201).render('home', {title:"Welcome"})
            
    } 
    catch (err){
        console.log(err)
        res.status(500).send("Failed to create user");
    }
}

const login_get = (req, res)=>{
    res.render('login/login', {title: 'Log in'})
}
const login_post = async (req, res)=>{
    const { email, password } = req.body;
    // const user = new User(req.body)
 
     if (!email || !password) {
         return res.status(400).send("Email and password are required");
     }
     try {
           const logged = await User.find({email: email, password:password})
           res.status(201).render('home', {title:"Welcome", users:logged})         
     } 
     catch (err){
         console.log(err)
         res.status(500).send("Incorrect email/password");
     }
}

module.exports = {
    signup_get, signup_post, login_get , login_post
}