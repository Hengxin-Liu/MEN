const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const url = 'mongodb+srv://Admin:nicai850401@cluster0.t0fxt.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(url,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
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

app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title:'new blog',
    snippet:'about my new blog',
    body:'more about my new blog'
   });
   blog.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
})
//  //if there no response in the code use next() move to next middleware
// app.use((req,res,next) => {
//   console.log('weclome'); 
//   next();
// });

app.get('/', (req, res) => {
//   res.send('Hello');
//  res.sendFile('./view/index.html', {root: __dirname})
 res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  //  res.sendFile('./view/about.html', {root: __dirname});
  res.render('about', {title: 'About'});
});

//blog routes
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({createdAt: -1 })
   .then((result) => {
     res.render('index.ejs',{title:'All Blogs', blogs: result});
   })
   .catch((err) => {
    console.log(err);
   })
});

app.get('/blogs/:id',(req, res) => {
  const id = req.params.id;
  Blog.findById(id)
   .then((result) => {
    res.render('details',{title:'Blog details', blog: result})
   })
   .catch((err) => {
    console.log(err);
  });
});

app.post('/blogs',(req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    })
});

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then( result => {
      res.json({redirect : '/blogs'});
    })
    .catch( err => {
      console.log(err);
    });
});


//redirect
app.get('/about-us',(req, res) => {
    res.redirect('/about');
})

//404 page, app.js will run command from top to bottom, it will run every use() 
// until find matched get() command end. so app.use put here
app.use( (req, res) => {
//  res.status(404).sendFile('./view/404.html', {root: __dirname });
  res.status(404).render('404', {title : '404'});
});



