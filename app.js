const express = require('express')

//express app
const app = express()
const path = require('path')

const passport = require('passport')

const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const port = process.env.PORT || 3000
const uri = process.env.DATABASE_URI;
  
//connect mongoDB
const mongoose = require('mongoose')
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

const methodOverride = require('method-override')

const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')

//morgan
const morgan = require('morgan');
const { checkUser } = require('./middleware/authMiddleware');

//register view engine
app.set('view engine', 'ejs')

//middleware and static files
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan('dev'));
app.use(cookieParser());
app.use(methodOverride('_method'))
app.use(session({
    secret: "nodejs",
    resave: true,
    saveUninitialized: true
}))
//middleware for passport
app.use(passport.initialize())
app.use(passport.session())

//middleware for flash messages
app.use(flash())

//routes
const blogRoutes = require('./routes/blogRoutes')
const authRoutes = require('./routes/authRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const galleryRoutes = require('./routes/galleryRoutes')
const movieRoutes = require('./routes/movieRoutes')

//Setting messages variables globally
app.use((req,res, next)=>{
    res.locals.success_msg = req.flash(('success_msg'))
    res.locals.error_msg = req.flash(('error_msg'))
    res.locals.error = req.flash(('error'))
    res.locals.currentUser = req.user
    next()
})

//adding bootstrap
app.use(
    "/",express.static("./node_modules/bootstrap/dist")
  );

//all routes
app.get('*', checkUser)
app.get('/', (req,res)=> {
   res.render('home', {title: 'Welcome'})
})

app.get('/about', (req,res)=> {
   // res.sendFile('./views/about.html', {root: __dirname});
   res.render('about', {title: 'About'})
})
//redirects
app.get('/about-us', (req, res)=>{
    res.redirect('/about');
})

//All routes
app.use('/blogs',blogRoutes)
app.use('/employees', employeeRoutes)
app.use('/gallery', galleryRoutes)
app.use(authRoutes)
app.use('/movies', movieRoutes)

// get-set cookie
app.get('/set-cookies', (req,res)=>{
    res.cookie('isEmployee', true, {maxAge: 1000*60*60*24 , httpOnly: true })
    res.send('cookie is set')
})
app.get('/read-cookies', (req, res)=>{
    const cookies = req.cookies
    console.log(cookies)
    res.json(cookies)
})

//404
app.use((req,res)=>{
    res.status(404).render('404', {title: '404 Not Found'})
})