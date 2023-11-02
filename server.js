var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the 'css', 'js', and 'img' directory
app.use(express.static('static/css'));
app.use(express.static('static/js'));
app.use(express.static('static/img'));

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

class Song {
  constructor(artist, title, length) {
    this.artist = artist
    this.title = title
    this.length = length
  }
}

class Playlist {
  constructor(playlist, dj, songs) {
    this.playlist = playlist
    this.dj = dj
    this.songs = songs
  }
}

app.get('/playlists', function(req, res) {
  res.render('pages/playlists');
});

app.get('/playlist', function(req, res) {
  res.render('pages/playlists');
});

app.listen(8080);
console.log('Server is listening on 127.0.0.1:8080');