var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the 'css', 'js', and 'img' directory
app.use(express.static('css'));
app.use(express.static('js'));
app.use(express.static('img'));

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

app.listen(8080);
console.log('Server is listening on port 8080');