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

var baseDay = document.createElement("label");
var baseDayInput = document.createElement("input");
baseDayInput.type = "checkbox"
baseDayInput.name = "playlist-day"
baseDay.appendChild(baseDayInput)

document.addEventListener("DOMContentLoaded", event => {
	// Hacky method to transfer playlist info to client
	var jsonElem = document.getElementById("json-data");
	var jsonObj = JSON.parse(jsonElem.value);
	document.body.removeChild(jsonElem);
	
	const days = ["playlist-monday", "playlist-tuesday", "playlist-wednesday", "playlist-thursday", "playlist-friday", "playlist-saturday", "playlist-sunday"];

	const songHolder = document.getElementById("playlist-songs");
	const dayIDs = document.querySelectorAll("#playlist-days input")

	var currSelection = null;
	function updateSelection(newSelection, jsonData) {
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
		document.querySelector("#playlist-dj a").textContent = jsonData.dj.name;
		currSelection.style["background-color"] = "#352e53";

		for (const song of jsonData.songs) {
			var newSong = baseElem.cloneNode(true);
			newSong.querySelector(".song-name").textContent = song.name;
			newSong.querySelector(".artist-name").textContent = song.artists.join(", ");

			var duration = song.durationMs / 1000
			var durationStr = String(Math.floor(duration / 60)).padStart(2, "0") + "m" + String(duration % 60).padStart(2, "0") + "s";
			newSong.querySelector(".duration").textContent = "Length: " + durationStr;
			songHolder.appendChild(newSong);
		}

		var playlistID = jsonData.id;

		// Also update days check boxes
		for (var i = 0; i < dayIDs.length; i++) {
			dayIDs[i].checked = jsonData.timeslots[i];

			dayIDs[i].onclick = function(event) {
				const dayID = event.srcElement.id;
				for (var j = 0; j < days.length; j++) {
					if (days[j] == dayID) {
						jsonData.timeslots[j] = event.srcElement.checked;
					}
				}

				fetch("updatePlaylist", {
					method: "POST",
					body: JSON.stringify({
						id: playlistID,
						timeslots: jsonData.timeslots,
					}),
					headers: {
						"Content-type": "application/json; charset=UTF-8"
					}
				});
			}
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