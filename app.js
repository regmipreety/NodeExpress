const express = require('express')

//express app
const app = express()

//register view engine
app.set('view engine', 'ejs')

//listen for requests 
app.listen(3000);

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

//redirects
app.get('/about-us', (req, res)=>{
    res.redirect('/about');
})

//404
app.use((req,res)=>{
    res.status(404).render('404', {title: '404 Not Found'})
})