// Needed to access Spotify credentials in an .env file
require('dotenv').config();

var express = require('express');
var app = express();
const mongoose = require('mongoose');

// connect to mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/myapp');

// set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the 'css', 'js', and 'img' directory
app.use(express.static('static/css'));
app.use(express.static('static/js'));
app.use(express.static('static/img'));


const songSchema = new mongoose.Schema({
  spotifyID: String,
  name: String,
  artists: [String],
  album: String,
  durationMs: Number,
  imageURL: String,
  audioURL: String
});

const djSchema = mongoose.Schema({
  name: String,
  numFollowers: Number,
  imageURL: String
});

const playlistSchema = new mongoose.Schema({
  songs: [songSchema],
  dj: djSchema,
  name: String,
  numSongs: Number,
  timeslots: [Boolean],
  length: Number,
  imageURL: String
});

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// search page
app.get('/search', function(req, res) {
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

class Song {
  constructor(artist, title, duration) {
    this.artist = artist;
    this.title = title;
    this.duration = duration;
  }
}

class Playlist {
  constructor(id, name, dj, songs) {
    this.id = id
    this.name = name;
    this.dj = dj;
    this.songs = songs;
  }

  getDuration() {
    var duration = 0
    for (const song of this.songs) {
      duration += song.duration
    }

    // If duration is larger than 60 seconds we need to format it properly
    return `${Math.floor(duration / 60)}m${duration % 60}s`
  }
}

var playlistData = [];
var numPlaylists = randInt(5, 20);
var numSongs = randInt(5, 10);

for (i = 0; i < numPlaylists; i++) {
  songs = [];
  for (j = 0; j < numSongs; j++) {
    songs.push(new Song(`Artist #${j}`, `Song #${(10 * i) + j}`, randInt(100, 300)))
  }

  playlistData.push(new Playlist(i, `Playlist #${i}`, `DJ #${i}`, songs));
}

app.get('/playlists', function(req, res) {
  res.render('pages/playlists', {playlists: playlistData});
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
