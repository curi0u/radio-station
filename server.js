// Needed to access Spotify credentials in an .env file
require('dotenv').config();

var express = require('express');
var app = express();
const mongoose = require('mongoose');
require("./database");

// connect to mongoDB
// To drop this database for testing in mongosh, run this:
// mongosh --eval "use myapp" --eval  "db.dropDatabase()"
// mongosh --eval "use myapp" --eval  "db.songs.find()"
mongoose.connect('mongodb://127.0.0.1:27017/myapp');
const Song = mongoose.model("Song");
const DJ = mongoose.model("DJ");
const Playlist = mongoose.model("Playlist");

// set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the 'css', 'js', and 'img' directory
app.use(express.static('static/css'));
app.use(express.static('static/js'));
app.use(express.static('static/img'));

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

// search page
app.get('/search', function(req, res) {
  if (req.query.query != "") {
    var matches = Song.find({title: req.query.query});

    var ret = [];
    matches.forEach()
  }

  // name: `Song Name #${i}`,
  // artist: `Artist Name #${i}`,
  // album: `Album Name #${i}`,
  // duration: '0:00'

  res.render('pages/search');
});

// addSongFromSearch page
app.get('/addSongFromSearch', function(req, res) {
  const imageURL = req.query.imageURL;
  const songName = req.query.songName;
  const songArtist = req.query.songArtist;

  res.render('pages/addSongFromSearch', {
    imageURL: imageURL,
    songName: songName,
    songArtist: songArtist
  });
});

app.get('/playlists', function(req, res) {
  res.render('pages/playlists', {playlists: Playlist.find()});
});

app.get('/playlist/:id', function(req, res) {
  var playlistID = req.params.id;

  for (const playlist of playlistData) {
    if (playlist.id == playlistID) {
      res.render('pages/playlist', {playlist: playlist});
    }
  }
});

app.get('/playlist/:id/songs', function(req, res) {
  var playlistID = req.params.id;

  for (const playlist of playlistData) {
    if (playlist.id == playlistID) {
      res.json({songs: playlist.songs});
    }
  }
});

const port = 8080
app.listen(port);
console.log('Server is listening on 127.0.0.1:' + port);
