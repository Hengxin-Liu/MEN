const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routers/blogRouter');

const app = express();

const url = 'mongodb+srv://Admin:nicai850401@cluster0.t0fxt.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true })
 .then((result) => {
  console.log('connected to db');
  app.listen(5000);
 })
 .catch((err) => {console.log(err)});

// register view engine
app.set('view engine', 'ejs');

// make sure server can send files to browser 
app.use(express.static('public'));
// convert data from website from to request object(body)
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
  //   res.send('Hello');
  //  res.sendFile('./view/index.html', {root: __dirname})
   res.redirect('/blogs');
  });

app.get('/about', (req, res) => {
    //  res.sendFile('./view/about.html', {root: __dirname});
    res.render('about', {title: 'About'});
 }); 

// if there no response in the code use next() move to next middleware
// app.use((req,res,next) => {
//   console.log('weclome'); 
//   next();
// });

//redirect
app.get('/about-us',(req, res) => {
    res.redirect('/about');
})

app.use('/blogs',blogRoutes);
//404 page, app.js will run command from top to bottom, it will run every use() 
// until find matched get() command end. so app.use put here
app.use( (req, res) => {
//  res.status(404).sendFile('./view/404.html', {root: __dirname });
  res.status(404).render('404', {title : '404'});
});



