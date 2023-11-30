// Needed to access Spotify credentials in an .env file
require('dotenv').config();

var express = require('express');
var app = express();
const mongoose = require('mongoose');
require("./database");

//Added for userPreferences Post
app.use(express.urlencoded({extended: true}));

// connect to mongoDB
// To drop this database for testing in mongosh, run this:
// mongosh --eval "use myapp" --eval  "db.dropDatabase()"
// mongosh --eval "use myapp" --eval  "db.songs.find()"
mongoose.connect('mongodb://127.0.0.1:27017/myapp');
const Song = mongoose.model("Song");
const DJ = mongoose.model("DJ");
const Playlist = mongoose.model("Playlist");

//For userPreferences and userSuggestions
const user_preferences = mongoose.model("user_preferences");

// set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the 'css', 'js', and 'img' directory
app.use(express.static('static/css'));
app.use(express.static('static/js'));
app.use(express.static('static/img'));

// Match appropriate JSON requests
app.use(express.json())

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

// search page
app.get('/search', function(req, res) {
  res.render('pages/search');
});

// userPreferences page
app.get('/preferences', function(req, res) {
  res.render('pages/userPreferences');
});

// userSuggestions page
app.get('/suggestions', function(req, res) {
  res.render('pages/userSuggestions');
});

//Inserts user's preferences into the shared database
app.post("/", async (req, res) =>{
  const data = new user_preferences(req.body)
  await data.save()
  res.render('pages/userPreferences');
})

// addSongFromSearch page
app.get('/addSongFromSearch', function(req, res) {
  const trackID = req.query.trackID;
  const imageURL = req.query.imageURL;
  const songName = req.query.songName;
  const songArtist = req.query.songArtist;

  res.render('pages/addSongFromSearch', {
    trackID: trackID,
    imageURL: imageURL,
    songName: songName,
    songArtist: songArtist
  });
});

function formatDuration(playlist) {
  var duration = 0
  playlist.songs.forEach(song => {
    duration += song.durationMs
  })

  const seconds = duration / 1000
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}m${String(seconds % 60).padStart(2, "0")}s`
}

app.get('/playlists', async function(req, res) {
  res.render('pages/playlists', {formatDuration: formatDuration, playlists: await Playlist.find()});
});

app.get('/playlist/:id', async function(req, res) {
  var playlist = await Playlist.findOne({id: req.params.id});
  if (playlist) {
    res.render('pages/playlist', {playlist: playlist});
  }
});

app.post('/playlist/:id/deleteSong', async function(req, res) {
  if (req.body) {
    await Playlist.findOneAndUpdate({id: req.params.id}, { "$pull": { "songs": { "name": req.body.name } } }, { safe: true, multi: false })
    res.json({success: true});
  }
});

app.post('/updatePlaylist', async function(req, res) {
  if (req.body) {
    await Playlist.findOneAndUpdate({id: req.body.id}, {timeslots: req.body.timeslots});
    res.json({success: true});
  }
});

// TODO
app.post('/addToPlaylist', async function(req, res) {
  if (req.body) {
    var playlist = Playlist.findOne({id: req.body.id});
    var song = Song.findOne({name: req.body.name});
    if (playlist && song) {
      playlist.songs.push(song);
    }
    res.json({success: true});
  }
});

app.get('/api/getPlaylists', async function(req, res) {
  try {
    const playlists = await Playlist.find();
    res.json({ playlists });
  } catch (error) {
    console.error('Error fetching playlists:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/addSongFromSearch', async function (req, res) {
  try {
    const { playlistName, songInfo } = req.body;

    // Find the playlist in the database
    const playlist = await Playlist.findOne({ name: playlistName });

    // Update the playlist with the new song
    const song = new Song ({
      spotifyID: songInfo.id,
      name: songInfo.name,
      artists: songInfo.artists,
      album: songInfo.album,
      durationMs: songInfo.duration,
      imageURL: songInfo.imageURL
    })
    playlist.songs.push(song);
    await playlist.save();

    res.status(200).json({ message: 'Song added to playlist successfully' });
  } catch (error) {
    console.error('Error adding song to playlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = 8080
app.listen(port);
console.log('Server is listening on 127.0.0.1:' + port);
