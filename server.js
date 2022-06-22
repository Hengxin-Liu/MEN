const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // set header content type
  res.setHeader('Content-Type','text/html');
  
  let path = './view/';
  switch(req.url){
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
  // redirect about-me page to about
    case '/about-us':
      path += 'about.html';
      res.statusCode = 301;
      res.setHeader('Location','/about');
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
      break;
  }
  // send html file from other files
  fs.readFile(path, (err, data) => {
    if(err){
      console.log(err);
      res.end();
    }else{
      res.write(data);
      //if send one data once use res.send(data);
      res.end();
    }
  });
 

  // res.write('<p>Hello</p>');
  // res.write('<h1>Hello</h1>');
  // res.end();

});

server.listen(3000 , 'localhost', ()=>{
    console.log('listning 3000 ');
});