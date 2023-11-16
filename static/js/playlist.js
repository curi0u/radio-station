document.addEventListener("DOMContentLoaded", event => {
    var playlistID = document.querySelector("#playlist-id").value;
    var playlistSongs = document.querySelector("#playlist-songs");

    playlistSongs.querySelectorAll(".playlist-song").forEach(song => {
        var songName = song.querySelector(".song-name").textContent
        song.querySelector(".delete-button").addEventListener("click", event => {
            fetch("/playlist/" + playlistID + "/deleteSong", {
                method: "POST",
                body: JSON.stringify({
                    name: songName,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(_ => {
                playlistSongs.removeChild(song);
            });
        })

        song.querySelector(".play-button").addEventListener("click", event => {
            window.alert("Playing Song: " + songName);
        })

        song.querySelector(".add-button").addEventListener("click", event => {
            // TODO:
            // fetch("addToPlaylist", {
            //     method: "POST",
            //     body: JSON.stringify({
            //         id: playlistID,
            //         name: songName,
            //     }),
            //     headers: {
            //         "Content-type": "application/json; charset=UTF-8"
            //     }
            // });
        })
    })
});