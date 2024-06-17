const express = require('express')

//express app
const app = express()

//connect mongoDB
const mongoose = require('mongoose')
const uri = "mongodb+srv://admin:test1234@cluster0.55lwxst.mongodb.net/node-tutorial?retryWrites=true&w=majority";
mongoose.connect(uri)
    .then((result)=> app.listen(3000))
    .catch((err)=> console.log(err))

const Blog = require('./models/blog')

//morgan
const morgan = require('morgan')

//register view engine
app.set('view engine', 'ejs')

//middleware and static files
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'));

//adding bootstrap
app.use(
    "/",express.static("./node_modules/bootstrap/dist")
  );

app.get('/', (req,res)=> {
    //res.send('<p> home page </p')
   // res.sendFile('./views/index.html', { root: __dirname });
   const blogs = [
    {title: 'Lorem ipsum', snippet: 'The classic latin passage that just never gets old, enjoy as much'},
    {title: 'Hodor Ipsum', snippet: 'If you havent seen Game of Thrones, go watch it right now'},
    {title: 'Trump Ipsum', snippet: 'If you havent seen Game of Thrones, go watch it right now'},

   ];
   res.render('index', {title : 'Home', blogs})
   //express will look inside the views folder 
})

app.get('/about', (req,res)=> {
   // res.sendFile('./views/about.html', {root: __dirname});
   res.render('about', {title: 'About'})
})

app.get('/blogs/create', (req,res)=> {
    // res.sendFile('./views/about.html', {root: __dirname});
    res.render('create', {title: 'New Blog'})
 })

 app.get('/add-blog', (req,res)=>{
    const blog = new Blog ({
        title: ' second Blog',
        snippet: ' about my new blog',
        body: 'save new blog'
    })
    blog.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
 })

 //Get all blogs
 app.get('/all-blogs', (req,res)=>{
    Blog.find().sort({createdAt: - 1})
    .then((result)=>{
        res.render('index', {blogs: result, title: 'All Blogs'})
    })
    .catch((err)=>{
        console.log(err)
    })
 })

 //Get single blog
 app.get('/blog', (req,res)=>{
    Blog.findById('666dd208bc6b527430bad51d')
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
 })

 app.post('/blogs', (req,res)=>{
   const blog = new Blog(req.body)
   blog.save()
    .then((result)=>{
        res.redirect('/all-blogs')
    })
    .catch((err)=>{
        console.log(err)
    })
 })

 app.get('/blogs/:id', (req,res)=>{
    const id = req.params.id
    Blog.findById(id)
        .then((result)=>{
            res.render('details', {blogs: result, title: 'Blog details'})
        })
        .catch((err) =>{
            console.log(err)
        })
 })

//redirects
app.get('/about-us', (req, res)=>{
    res.redirect('/about');
})

//404
app.use((req,res)=>{
    res.status(404).render('404', {title: '404 Not Found'})
})