const fs = require('fs');

const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set ('view engine', 'hbs');
app.use(express.static(__dirname +'/public'));

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

//middileware

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log +'\n', (err)=>{
    if(err){
      console.log('Unable to Write File');
    }
  });
next();
});

//under maintence page
// app.use((req,res,next)=>{
//   res.render('maintence.hbs')
// });


hbs.registerHelper('scremIt', text =>{
  return text.toUpperCase();
});
app.get('/',(req, res)=>{
//  res.send('<h1 style="color:blue">Hello Express..!</h1>');
  // console.log('hello sants...!');
  // res.send({
  //   name:'sants',
  //   mobile:90009000,
  //   ssss:74744
  // });
  res.render('home.hbs',{
    pageTitle:'Home',
    welcomeContent:'Welcome Content',
  //  currentYear : new Date().getFullYear()
  });
});
//about
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About page',
  //  currentYear: new Date().getFullYear()
  });
});

//bad req
app.get('/bad',(req,res)=>{
  var errorMsg1 ={
    name:'errorMsg1',
    code:304,
    status:'page not modified'

  };
  res.send(errorMsg1);
});
app.listen(3000, () =>{
  console.log('Server is started on port 3000');
});
