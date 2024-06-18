const express = require('express')

const router = express.Router();

router.get('/blogs/create', (req,res)=> {
    // res.sendFile('./views/about.html', {root: __dirname});
    res.render('create', {title: 'New Blog'})
 })

const Blog = require('../models/blog')

 router.get('/add-blog', (req,res)=>{
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
 router.get('/all-blogs', (req,res)=>{
    Blog.find().sort({createdAt: - 1})
    .then((result)=>{
        res.render('index', {blogs: result, title: 'All Blogs'})
    })
    .catch((err)=>{
        console.log(err)
    })
 })

 //Get single blog
 router.get('/blog', (req,res)=>{
    Blog.findById('666dd208bc6b527430bad51d')
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
 })

 router.post('/blogs', (req,res)=>{
   const blog = new Blog(req.body)
   blog.save()
    .then((result)=>{
        res.redirect('/all-blogs')
    })
    .catch((err)=>{
        console.log(err)
    })
 })

 router.get('/blogs/:id', (req,res)=>{
    const id = req.params.id
    Blog.findById(id)
        .then((result)=>{
            res.render('details', {blogs: result, title: 'Blog details'})
        })
        .catch((err) =>{
            console.log(err)
        })
 })

 router.delete('/blogs/:id', (req,res)=>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then(result=>{
            res.json({redirect: '/all-blogs'})
        })
        .catch((err)=>{
            console.log(err)
        })
})

module.exports = router