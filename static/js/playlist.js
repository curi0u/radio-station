document.addEventListener("DOMContentLoaded", event => {
    let playlistSongs = document.querySelector("#playlist-songs")

    playlistSongs.querySelectorAll(".playlist-song").forEach(song => {
        song.querySelector(".delete-button").addEventListener("click", event => {
            playlistSongs.removeChild(song);
        })

        let songName = song.querySelector(".song-name")
        song.querySelector(".play-button").addEventListener("click", event => {
            window.alert("Playing Song: " + songName.innerHTML);
        })
    })
});