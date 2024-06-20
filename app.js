const express = require('express')

//express app
const app = express()

//connect mongoDB
const mongoose = require('mongoose')
const uri = "mongodb+srv://admin:test1234@cluster0.55lwxst.mongodb.net/node-tutorial?retryWrites=true&w=majority";
mongoose.connect(uri)
    .then((result)=> app.listen(3000))
    .catch((err)=> console.log(err))

const blogRoutes = require('./routes/blogRoutes')
const authRoutes = require('./routes/authRoutes')

//morgan
const morgan = require('morgan')

//register view engine
app.set('view engine', 'ejs')

//middleware and static files
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
//app.use(express.json())
app.use(morgan('dev'));

//adding bootstrap
app.use(
    "/",express.static("./node_modules/bootstrap/dist")
  );

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

//blog routes
app.use('/blogs',blogRoutes)
app.use(authRoutes)

//404
app.use((req,res)=>{
    res.status(404).render('404', {title: '404 Not Found'})
})