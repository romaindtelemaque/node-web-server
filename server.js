const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url} `;

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server log');
    }
  });

  next();
});

// app.use((request, response, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (request, response) => {
  response.render('home.hbs', {
    pageTitle: 'Home page with hbs',
    author: 'Romain Drevet',
    welcomeMessage: 'Welcome to Node Js website',
    beginDate: '08/02/2018',
  });
});

app.get('/maintenance', (request, response) => {
  response.render('maintenance.hbs', {
    pageTitle: 'Website in maintenance',
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About page',
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage : 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
