var baseElem = document.createElement("div");
baseElem.classList.add("playlist-song");

var baseImg = document.createElement("img");
baseImg.src = "/temp_music_icon.png";
baseImg.alt = "DJ Image";
baseElem.appendChild(baseImg);

var baseInfo = document.createElement("div");
baseInfo.classList.add("info-box");
baseElem.appendChild(baseInfo);

var baseInfoSong = document.createElement("p");
baseInfoSong.classList.add("song-name");
baseInfo.appendChild(baseInfoSong);

var baseInfoArtist = document.createElement("p");
baseInfoArtist.classList.add("artist-name");
baseInfo.appendChild(baseInfoArtist);

var baseDuration = document.createElement("p");
baseDuration.classList.add("duration");
baseElem.appendChild(baseDuration);

document.addEventListener("DOMContentLoaded", event => {
	// Hacky method to transfer playlist info to client
	let jsonElem = document.getElementById("json-data");
	var jsonObj = JSON.parse(jsonElem.value);
	document.body.removeChild(jsonElem);
	
	let songHolder = document.getElementById("playlist-songs");

	let currSelection = null;
	function updateSelection(newSelection, jsonData) {
		console.log(jsonData);
		if (currSelection == newSelection) {
			return;
		}

		if (currSelection != null) {
			currSelection.style["background-color"] = "";
		}

		// Delete all child nodes
		while (songHolder.firstChild) {
			songHolder.removeChild(songHolder.lastChild);
		}

		currSelection = newSelection;
		console.log("selection has been updated to: " + jsonData.dj);
		document.querySelector("#playlist-dj a").textContent = jsonData.dj;
		currSelection.style["background-color"] = "#352e53";

		for (const song of jsonData.songs) {
			var newSong = baseElem.cloneNode(true);
			newSong.querySelector(".song-name").textContent = song.title;
			newSong.querySelector(".artist-name").textContent = song.artist;

			var duration = String(Math.floor(song.duration / 60)).padStart(2, "0") + "m" + String(song.duration % 60).padStart(2, "0") + "s";
			newSong.querySelector(".duration").textContent = "Length: " + duration;
			songHolder.appendChild(newSong);
		}
	}

	document.querySelectorAll(".playlist").forEach(playlist => {
		let playlistID = parseInt(playlist.querySelector(".playlist-id").value, 10);

		let jsonData = null;
		for (const p of jsonObj) {
			if (playlistID == p.id) {
				jsonData = p;
				break;
			}
		}

		if (playlistID == 0) {
			updateSelection(playlist, jsonData);
		}

		playlist.querySelector(".view-button").addEventListener("click", event => {
			updateSelection(playlist, jsonData);
		})

		playlist.querySelector(".edit-button").addEventListener("click", event => {
			window.location.href = "/playlist/" + playlistID;
		})
	})

})