const express = require('express')

//express app
const app = express()

//register view engine
app.set('view engine', 'ejs')

//listen for requests 
app.listen(3000);

app.get('/', (req,res)=> {
    //res.send('<p> home page </p')
   // res.sendFile('./views/index.html', { root: __dirname });
   res.render('index')
   //express will look inside the views folder 
})

app.get('/about', (req,res)=> {
   // res.sendFile('./views/about.html', {root: __dirname});
   res.render('about')
})

//redirects
app.get('/about-us', (req, res)=>{
    res.redirect('/about');
})

//404
app.use((req,res)=>{
    res.status(404).render('404')
})