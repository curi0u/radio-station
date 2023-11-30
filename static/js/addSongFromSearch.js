import { getSpotifyAccessToken, searchSpotify, spotifyResults } from './searchPagesFunctions.js';

let playlists;
let selectedSongInfo;

function openPlaylistPopup(playlistName, playlistSongs) {
  console.log('Opening playlist popup for', playlistName);

  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.onclick = closePlaylistPopup;

  // Create playlist popup
  const playlistPopup = document.createElement('div');
  playlistPopup.id = 'playlist-popup';
  
  // Create close button
  const closeButton = document.createElement('span');
  closeButton.className = 'close-btn';
  closeButton.innerHTML = '&times;';
  closeButton.onclick = closePlaylistPopup;

  // Create playlist title
  const title = document.createElement('h2');
  title.textContent = playlistName;

  // Create playlist songs list
  const songsList = document.createElement('ul');
  playlistSongs.forEach((song, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = (index + 1).toString() + ". " + song.artists[0] + " - " + song.name;
    songsList.appendChild(listItem);
  });

  // Append elements to playlistPopup
  playlistPopup.appendChild(closeButton);
  playlistPopup.appendChild(title);
  playlistPopup.appendChild(songsList);

  // Append overlay and playlistPopup to body
  document.body.appendChild(overlay);
  document.body.appendChild(playlistPopup);

  // Display the popup by setting its style
  playlistPopup.style.display = 'block';

  // Display the overlay
  overlay.style.display = 'block'
}

function closePlaylistPopup() {
  // Remove the overlay
  const overlay = document.getElementById('overlay');
  overlay.parentNode.removeChild(overlay);

  // Remove the playlist popup
  const playlistPopup = document.getElementById('playlist-popup');
  playlistPopup.parentNode.removeChild(playlistPopup);
}

document.addEventListener('DOMContentLoaded', function () {
  // Get references
  const playlistsContainer = document.getElementById('playlists');
  const selectedSongID = window.trackID;
  // Place your SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in a .env file
  const clientId = window.env.SPOTIFY_CLIENT_ID;
  const clientSecret = window.env.SPOTIFY_CLIENT_SECRET;

  const getSongInfo = async (clientId, clientSecret, trackID) => {
    const apiUrl = `https://api.spotify.com/v1/tracks/${trackID}`;
    const accessToken = await getSpotifyAccessToken(clientId, clientSecret);

    try {
      // Make a GET request to the Spotify API
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        // Parse the JSON response
        const data = await response.json();

        // Extract relevant information from the Spotify API response
        const defaultImageUrl = '/temp_music_icon.png';
        selectedSongInfo = {
          id: data.id, // Each track has a unique Spotify ID
          name: data.name,
          artists: data.artists.map(artist => artist.name),
          album: data.album.name,
          duration: data.duration_ms,
          imageURL: data.album.images.length > 0 ? data.album.images[0].url : defaultImageUrl, // Use a default image URL if images array is empty
        };
        console.log(selectedSongInfo);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  async function fetchPlaylists() {
    try {
      const response = await fetch('/api/getPlaylists');
      const data = await response.json();
      playlists = data.playlists;
      displayResults(playlists, playlists.length);
      setUpAddToPlaylistButtons();
      console.log('Fetched playlists:', data.playlists);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  }

  // Function to display a specified number of results
  function displayResults(results, count) {
    console.log(results);
    // Clear previous results
    playlistsContainer.innerHTML = '';

    // Loop through the specified number of results and create HTML for each result
    for (let i = 0; i < count; i++) {
      const result = results[i];
      if (result) {
        const resultHTML = createResultHTML(result, i);
        // Append the result HTML to the container
        playlistsContainer.innerHTML += resultHTML;
      }
    }
  }

  // Function to create HTML for a single result
  function createResultHTML(result, index) {
    // Helper function to generate the check icon or an X
    function getDayIcon(isAvailable) {
      return isAvailable ? '<i class="fas fa-check"></i>' : '<i class="fas fa-x"></i>';
    }
    return `
      <div class="playlist-box" data-index="${index}">
        <img src="/temp_person_icon.png" alt="DJ Photo">
        <div class="info-box">
          <p class="playlist-name">${result.name}</p>
          <p class="song-count">${result.songs.length} Songs</p>
        </div>
        <table class="timetable">
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
          <tr>
            <td>${getDayIcon(result.timeslots[0])}</td>
            <td>${getDayIcon(result.timeslots[1])}</td>
            <td>${getDayIcon(result.timeslots[2])}</td>
            <td>${getDayIcon(result.timeslots[3])}</td>
            <td>${getDayIcon(result.timeslots[4])}</td>
            <td>${getDayIcon(result.timeslots[5])}</td>
            <td>${getDayIcon(result.timeslots[6])}</td>
          </tr>
        </table>
        <div class="button-box">
          <button type="button" class="view-playlist-button">View playlist</button>
          <button type="button" class="add-to-playlist-button" data-index="${index}">Add to this playlist</button>
        </div>
      </div>
    `;
  }

  function setUpAddToPlaylistButtons() {
    const addToPlaylistButtons = document.querySelectorAll('.add-to-playlist-button');
    addToPlaylistButtons.forEach((button) => {
      button.addEventListener('click', async function () {
        const index = button.getAttribute('data-index');
        const playlistName = playlists[index].name;
        // Log the data being sent in the request body
        console.log('Request Body:', {
          playlistName: playlistName,
          songInfo: selectedSongInfo,
        });
      
        // Access the song name from the header
        const songName = document.getElementById('song').textContent;
      
        // Make a request to the server to add the song to the playlist
        const response = await fetch('/api/addSongFromSearch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            playlistName: playlistName,
            songInfo: selectedSongInfo, // Pass the song information to the server
          }),
        });
      
        if (response.ok) {
          fetchPlaylists();
          alert(`Added "${songName}" to playlist "${playlistName}"`);
        } else {
          console.error('Error adding song to playlist:', response.statusText);
        }
      });
    });
  }

  playlistsContainer.addEventListener('click', function (event) {
    // Check if the "View Playlist" button was clicked
    if (event.target.classList.contains('view-playlist-button')) {
      // Find the corresponding playlist
      const index = event.target.closest('.playlist-box').getAttribute('data-index');
      const playlistName = playlists[index].name;
      const playlistSongs = playlists[index].songs;

      // Display pop-up view of the playlist
      openPlaylistPopup(playlistName, playlistSongs);
    }
  });


  getSongInfo(clientId, clientSecret, selectedSongID);
  fetchPlaylists();
});