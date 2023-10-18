document.addEventListener("DOMContentLoaded", event => {
    let playlistSongs = document.querySelector("#playlist-songs")

    playlistSongs.querySelectorAll(".playlist-song").forEach(song => {
        document.querySelectorAll(".delete-button").forEach(btn => {
            // Listener Approach
            btn.addEventListener("click", event => {
                playListSongs.removeChild(song)
            })
        })
    
        document.querySelectorAll(".play-button").forEach(btn => {
            let songName = btn.parentElement.parentElement.querySelector(".song-name")

            btn.addEventListener("click", event => {
                window.alert("Playing Song: " + songName.innerHTML)
            })
        })
    })
});