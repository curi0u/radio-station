const mongoose = require("mongoose");
require("./database");

function randInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Before running this make sure MongoDB is started on your computer
async function insertData() {
	await mongoose.connect("mongodb://127.0.0.1:27017/myapp");
	const Song = mongoose.model("Song");
	const Playlist = mongoose.model("Playlist");
	const DJ = mongoose.model("DJ");
	
	await Song.insertMany([{name: "Cruel Summer", artists: "Taylor Swift", durationMs: 221000}, {name: "Paint The Town Red", artists: "Doja Cat", durationMs: 190000}, {name: "Is It Over Now? (Taylor's Version) [From The Vault]", artists: "Taylor Swift", durationMs: 222000}, {name: "Snooze", artists: "SZA", durationMs: 275000}, {name: "Standing Next To You", artists: "Jung Kook", durationMs: 245000}, {name: "I Remember Everything", artists: "Zach Bryan Featuring Kacey Musgraves", durationMs: 206000}, {name: "Now And Then", artists: "The Beatles", durationMs: 132000}, {name: "Fast Car", artists: "Luke Combs", durationMs: 204000}, {name: "Thinkin' Bout Me", artists: "Morgan Wallen", durationMs: 263000}, {name: "Last Night", artists: "Morgan Wallen", durationMs: 225000}, {name: "Greedy", artists: "Tate McRae", durationMs: 285000}, {name: "Now That We Don't Talk (Taylor's Version) [From The Vault]", artists: "Taylor Swift", durationMs: 228000}, {name: "Fukumean", artists: "Gunna", durationMs: 232000}, {name: "Rich Baby Daddy", artists: "Drake Featuring Sexyy Red & SZA", durationMs: 205000}, {name: "Need A Favor", artists: "Jelly Roll", durationMs: 235000}, {name: "Dance The Night", artists: "Dua Lipa", durationMs: 295000}, {name: "Vampire", artists: "Olivia Rodrigo", durationMs: 195000}, {name: "Water", artists: "Tyla", durationMs: 150000}, {name: "Monaco", artists: "Bad Bunny", durationMs: 169000}, {name: "Agora Hills", artists: "Doja Cat", durationMs: 194000}, {name: "IDGAF", artists: "Drake Featuring Yeat", durationMs: 214000}, {name: "Save Me", artists: "Jelly Roll With Lainey Wilson", durationMs: 311000}, {name: "Flowers", artists: "Miley Cyrus", durationMs: 130000}, {name: "First Person Shooter", artists: "Drake Featuring J. Cole", durationMs: 139000}, {name: "Used To Be Young", artists: "Miley Cyrus", durationMs: 247000}, {name: "Say Don't Go (Taylor's Version) [From The Vault]", artists: "Taylor Swift", durationMs: 198000}, {name: "Lil Boo Thang", artists: "Paul Russell", durationMs: 263000}, {name: "What Was I Made For?", artists: "Billie Eilish", durationMs: 139000}, {name: "White Horse", artists: "Chris Stapleton", durationMs: 161000}, {name: "Good Good", artists: "Usher, Summer Walker & 21 Savage", durationMs: 186000}, {name: "Slut! (Taylor's Version) [From The Vault]", artists: "Taylor Swift", durationMs: 243000}, {name: "Cobra", artists: "Megan Thee Stallion", durationMs: 129000}, {name: "My Love Mine All Mine", artists: "Mitski", durationMs: 264000}, {name: "What It Is (Block Boy)", artists: "Doechii Featuring Kodak Black", durationMs: 174000}, {name: "Dial Drunk", artists: "Noah Kahan With Post Malone", durationMs: 193000}, {name: "Daylight", artists: "David Kushner", durationMs: 176000}, {name: "Stick Season", artists: "Noah Kahan", durationMs: 211000}, {name: "Kill Bill", artists: "SZA", durationMs: 192000}, {name: "Barbie World", artists: "Nicki Minaj & Ice Spice With Aqua", durationMs: 228000}, {name: "I Know ?", artists: "Travis Scott", durationMs: 286000}, {name: "Bad Idea Right?", artists: "Olivia Rodrigo", durationMs: 298000}, {name: "Wild Ones", artists: "Jessie Murph & Jelly Roll", durationMs: 277000}, {name: "Lose Control", artists: "Teddy Swims", durationMs: 297000}, {name: "Harley Quinn", artists: "Fuerza Regida & Marshmello", durationMs: 157000}, {name: "Style (Taylor's Version)", artists: "Taylor Swift", durationMs: 237000}, {name: "Pretty Little Poison", artists: "Warren Zeiders", durationMs: 243000}, {name: "Bad Blood (Taylor's Version)", artists: "Taylor Swift", durationMs: 140000}, {name: "World On Fire", artists: "Nate Smith", durationMs: 217000}, {name: "Seven", artists: "Jung Kook Featuring Latto", durationMs: 163000}, {name: "Suburban Legends (Taylor's Version) [From The Vault]", artists: "Taylor Swift", durationMs: 135000}, {name: "On My Mama", artists: "Victoria Monet", durationMs: 293000}, {name: "Try That In A Small Town", artists: "Jason Aldean", durationMs: 280000}, {name: "Strangers", artists: "Kenya Grace", durationMs: 214000}, {name: "Virginia Beach", artists: "Drake", durationMs: 229000}, {name: "500lbs", artists: "Lil Tecca", durationMs: 253000}, {name: "Can't Catch Me Now", artists: "Olivia Rodrigo", durationMs: 305000}, {name: "Perro Negro", artists: "Bad Bunny & Feid", durationMs: 159000}, {name: "3D", artists: "Jung Kook & Jack Harlow", durationMs: 144000}, {name: "Blank Space (Taylor's Version)", artists: "Taylor Swift", durationMs: 249000}, {name: "Get Him Back!", artists: "Olivia Rodrigo", durationMs: 315000}, {name: "The Painter", artists: "Cody Johnson", durationMs: 216000}, {name: "Great Gatsby", artists: "Rod Wave", durationMs: 210000}, {name: "Single Soon", artists: "Selena Gomez", durationMs: 205000}, {name: "Bongos", artists: "Cardi B & Megan Thee Stallion", durationMs: 126000}, {name: "Watermelon Moonshine", artists: "Lainey Wilson", durationMs: 184000}, {name: "Qlona", artists: "Karol G & Peso Pluma", durationMs: 260000}, {name: "Can't Have Mine", artists: "Dylan Scott", durationMs: 312000}, {name: "Lady Gaga", artists: "Peso Pluma, Gabito Ballesteros & Junior H", durationMs: 183000}, {name: "Everything I Love", artists: "Morgan Wallen", durationMs: 198000}, {name: "Slime You Out", artists: "Drake Featuring SZA", durationMs: 314000}, {name: "Rich Men North Of Richmond", artists: "Oliver Anthony Music", durationMs: 252000}, {name: "Wildest Dreams (Taylor's Version)", artists: "Taylor Swift", durationMs: 207000}, {name: "Out Of The Woods (Taylor's Version)", artists: "Taylor Swift", durationMs: 314000}, {name: "Truck Bed", artists: "HARDY", durationMs: 125000}, {name: "Meltdown", artists: "Travis Scott Featuring Drake", durationMs: 191000}, {name: "Hey Driver", artists: "Zach Bryan Featuring The War And Treaty", durationMs: 158000}, {name: "Welcome To New York (Taylor's Version)", artists: "Taylor Swift", durationMs: 134000}, {name: "Que Onda", artists: "Calle 24 x Chino Pacas x Fuerza Regida", durationMs: 278000}, {name: "Segun Quien", artists: "Maluma & Carin Leon", durationMs: 236000}, {name: "Burn It Down", artists: "Parker McCollum", durationMs: 128000}, {name: "Stars Like Confetti", artists: "Dustin Lynch", durationMs: 280000}, {name: "LaLa", artists: "Myke Towers", durationMs: 140000}, {name: "Shake It Off (Taylor's Version)", artists: "Taylor Swift", durationMs: 304000}, {name: "SkeeYee", artists: "Sexyy Red", durationMs: 195000}, {name: "God Gave Me A Girl", artists: "Russell Dickerson", durationMs: 198000}, {name: "Standing Room Only", artists: "Tim McGraw", durationMs: 294000}, {name: "Fina", artists: "Bad Bunny & Young Miko", durationMs: 295000}, {name: "El Amor de Su Vida", artists: "Grupo Frontera & Grupo Firme", durationMs: 265000}, {name: "All You Had To Do Was Stay (Taylor's Version)", artists: "Taylor Swift", durationMs: 226000}, {name: "Turks & Caicos", artists: "Rod Wave Featuring 21 Savage", durationMs: 194000}, {name: "Mi Ex Tenia Razon", artists: "Karol G", durationMs: 171000}, {name: "New Romantics (Taylor's Version)", artists: "Taylor Swift", durationMs: 234000}, {name: "Un Preview", artists: "Bad Bunny", durationMs: 228000}, {name: "Too Much", artists: "The Kid LAROI, Jung Kook & Central Cee", durationMs: 145000}, {name: "Save Me The Trouble", artists: "Dan + Shay", durationMs: 122000}, {name: "Clean (Taylor's Version)", artists: "Taylor Swift", durationMs: 134000}, {name: "Bleed", artists: "The Kid LAROI", durationMs: 296000}, {name: "But I Got A Beer In My Hand", artists: "Luke Bryan", durationMs: 128000}, {name: "We Don't Fight Anymore", artists: "Carly Pearce Featuring Chris Stapleton", durationMs: 181000}, {name: "Sarah's Place", artists: "Zach Bryan Featuring Noah Kahan", durationMs: 222000}]);
	
	// Now, generate some random playlist data with that
	for (var i = 0; i < randInt(5, 10); i++) {
		this.djObj = {name: `DJ #${i}`, numFollowers: randInt(1, 5000)}
		await DJ.create(djObj)

		const songs = await Song.aggregate().sample(randInt(10, 20)); //await Song.aggregate([{$sample: {size: randInt(10, 20)}}]);
		await Playlist.create({id: i, songs: songs, dj: djObj, name: `Playlist #${i}`, timeslots: [false, false, false, false, false, false, false]})
	}

	await mongoose.connection.close();
}

insertData();

function generateData() {
	const { getChart } = require("billboard-top-100");

	getChart("hot-100", "2023-11-15", (err, chart) => {
		if (err) {
			console.log(err);
			return;
		}

		var songStr = "";
		chart.songs.forEach(song => {
			// spotifyID: String,
			// name: String,
			// artists: [String],
			// album: String,
			// durationMs: Number,
			// imageURL: String,
			// audioURL: String

			songStr += `{name: "${song.title}", artists: ["${song.artist}"], durationMs: ${randInt(120, 315) * 1000}}, `
			//console.log(`Title: ${song.title}, Artist: ${song.artist}, Duration: ${randInt(120, 315)}`)	
		});

		console.log(`await Song.insertMany([${songStr}])`);
	})
}
