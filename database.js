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
	id: Number,
	songs: [songSchema],
	dj: djSchema,
	name: String,
	timeslots: [Boolean],
	imageURL: String
});

mongoose.model("Song", songSchema);
mongoose.model("DJ", djSchema);
mongoose.model("Playlist", playlistSchema);
