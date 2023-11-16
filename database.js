const mongoose = require('mongoose');

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

mongoose.model("Song", songSchema);
mongoose.model("DJ", djSchema);
mongoose.model("Playlist", playlistSchema);
