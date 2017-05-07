const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

 //process.env is an object that stores all of our environment variable as key value pair
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');

//app.use is how you use middleware 그리고 미들웨어는 여기 적혀져있는 순서대로 적용된다. 즉 미들웨어 위에 만들어진 코드들은 미들웨어의 영향을 받지 않고 실행된다. 예를 들어 지금 같은 경우는 next()의 영향을 받지 않는다.
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err){
      console.log('unable to append to server.log.')
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('scremIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'Homepage',
    welcomeMessage: 'Welcome to my website',

  })
  // res.send('<h1>Hello Express</h1>');
  // res.send({
  //   name: 'Andrew',
  //   likes: [
  //     'Apple',
  //     'Money'
  //   ]
  // });
});

app.get('/about',(req,res)=>{
  // res.send('About Page');
  res.render('about.hbs',{
    pageTitle: 'About Page',

  })//render는 말그대로 view 페이지를 렌더해주는것
});

// /bad - send back json with errorMessage
app.get('/bad',(req,res)=>{
  res.send({
    errorMessage: 'Unable to handle request'
  });
})


app.listen(port,()=>{
  console.log(`Server is up on port ${port}!`);
});
