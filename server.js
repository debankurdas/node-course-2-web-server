 const express=require('express');
 const hbs= require('hbs');
 const fs= require('fs');

 var app= express();
 /* registerPartial is for registering the folder where all hbs file are avilable for that project and
  we can reuse that. */
 hbs.registerPartials(__dirname + '/views/partials')
 app.use(express.static(__dirname + '/public'));
 app.use((req, res, next)=>
 {
    var now= new Date().toString();
    var log= `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>
    {
        if(err)
        {
            console.log('unable to connect');
        }
    });
   
    next();
 });
/*we pass object into res.send and node convert into json file $ show us
 app.get('/', (req,res) =>
 {
    //res.send('hello express');
    res.send(
        {
            name: 'Arush',
            likes: [
                'burger',
                'popcorn',
                'veg-burger'
            ]
        }
    );
 });
  */
 //it takes two argument, first for the helpername and second is the function
 hbs.registerHelper('getCurrentYear' , () =>
 {
    return new Date().getFullYear()
 });
 hbs.registerHelper('stringView', (text)=>
 {
    return text.toUpperCase();
 });
 app.get('/', (req,res) =>
 {
  res.render('home.hbs' ,{
      pageTitle: 'home',
      body: 'amar home body',
      welcomeMessage: 'welcome to our page'
  })
 });

 app.get('/about', (req,res)=>
 {
    res.render('about.hbs', {
        pageTitle: 'amar page',
        body: 'ami body',
    });
 });

 app.get('/bad', (req,res)=>
 {
    res.send(
        {
            errorMessage: 'unable to find'
        }
    )
 });

 app.listen(3000 , ()=>
 {
     console.log("Server up 3000 port");
 });