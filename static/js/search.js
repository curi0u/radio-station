import { getSpotifyAccessToken, searchSpotify, spotifyResults } from './searchPagesFunctions.js';

document.addEventListener('DOMContentLoaded', function () {
  // Max number of results to display
  const MAXRESULTS = 25;
  // Initialized to number of initial results
  let displayedResultsCount = 5;
  // Search query
  let query;

  // Get references to input, result container, and view more button
  const searchBar = document.getElementById('search-bar-input');
  const searchResultsContainer = document.getElementById('search-results');
  const viewMoreButton = document.getElementById('view-more-button');
  const noResultsMessage = document.getElementById('no-results-message');
  // Place your SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in a .env file
  const clientId = window.env.SPOTIFY_CLIENT_ID;
  const clientSecret = window.env.SPOTIFY_CLIENT_SECRET;
  
  // Function to redirect to another page with query parameters
  function redirectToAnotherPage(trackID, imageURL, songName, songArtists) {
    const url = `/addSongFromSearch?trackID=${encodeURIComponent(trackID)}&imageURL=${encodeURIComponent(imageURL)}&songName=${encodeURIComponent(songName)}&songArtist=${encodeURIComponent(songArtists)}`;

    // Store search query and state information in session storage
    // sessionStorage.setItem('searchQuery', query);
    // sessionStorage.setItem('displayedResultsCount', displayedResultsCount);
    // sessionStorage.setItem('scrollPosition', window.scrollY);

    window.location.href = url;
  }

  // Function to display a specified number of results
  function displayResults(results, count) {
    // Clear previous results
    searchResultsContainer.innerHTML = '';

    // Loop through the specified number of results and create HTML for each result
    for (let i = 0; i < count; i++) {
      const result = results[i];
      if (result) {
        const resultHTML = createResultHTML(result, i);
        // Append the result HTML to the container
        searchResultsContainer.innerHTML += resultHTML;
      }
    }

    // Show or hide the "View More" button based on the number of results
    viewMoreButton.style.display = results.length >= displayedResultsCount && results.length < MAXRESULTS ? 'block' : 'none';

    // Show or hide the no results message based on the number of results
    noResultsMessage.style.display = results.length === 0 ? 'block' : 'none';
  }


  // Function to create HTML for a single result
  function createResultHTML(result, index) {
    return `
      <div class="song-box" data-index="${index}">
        <!-- Customize this part based on your data structure -->
        <img src="${result.imageURL}" alt="Song Image">
        <div class="info-box">
          <p class="song-name">${result.name}</p>
          <p class="artist-name">${result.artists}</p>
        </div>
        <div class="album-box">
          <p class="album-name">${result.album}</p>
        </div>
        <div class="duration-box">
          <p class="duration">${result.duration}</p>
        </div>
        <div class="button-box">
          <button type="button" class="favorite-button"><i class="fa-solid fa-heart" style="color: red"></i> Favorite</button>
          <button type="button" class="play-button"><i class="fa-solid fa-play" style="color: green"></i> Play</button>
          <button type="button" class="playlist-add-button"><i class="fa-solid fa-circle-plus" style="color: blue"></i> Add to playlist</button>
        </div>
      </div>
    `;
  }

  // Function to handle search bar input
  function handleSearchInput() {
    query = searchBar.value.toLowerCase();

    if (query.trim() !== '') {
      getSpotifyAccessToken(clientId, clientSecret)
        .then((accessToken) => {
          if (accessToken) {
            return searchSpotify(query, accessToken, displayedResultsCount);
          } else {
            return null;
          }
        })
        .then((spotifyResults) => {
          if (spotifyResults != null) {
            displayResults(spotifyResults, displayedResultsCount);
          } else {
            displayResults([], 0);
          }
        })
        .catch((error) => {
          console.error(error);
          displayResults([], 0);
        });
    } else {
      displayResults([], 0);
    }
  }

  // Event listener for the search bar
  searchBar.addEventListener('input', handleSearchInput);

  // Event listener for the "View More" button
  viewMoreButton.addEventListener('click', function () {
    if (displayedResultsCount == MAXRESULTS) {
      alert("Max amount of results reached!");
    }

    displayedResultsCount = (displayedResultsCount === MAXRESULTS) ? MAXRESULTS : displayedResultsCount + 5;

    handleSearchInput();
  });

  // Event listener for the "Favorite" and "Play" buttons
  searchResultsContainer.addEventListener('click', function (event) {
    // Find the corresponding song name
    const index = event.target.closest('.song-box').getAttribute('data-index');
    const songName = spotifyResults[index].name;

    // Check if "Favorite" button was clicked
    if (event.target.classList.contains('favorite-button')) {
      // Show an alert with the added song name to favorites
      alert(`Added ${songName} to favorites`);

      // Check if the "Play" button was clicked
    } else if (event.target.classList.contains('play-button')) {
      // Show an alert saying that the corresponding song is now playing
      alert(`Now playing ${songName}`);
    }
  });

  // Event listener for the "Add to playlist" button
  searchResultsContainer.addEventListener('click', function (event) {
    // Check if the "Add to playlist" button was clicked
    if (event.target.classList.contains('playlist-add-button')) {
      // Find the corresponding song info
      const index = event.target.closest('.song-box').getAttribute('data-index');
      const trackID = spotifyResults[index].id;
      const imageURL = spotifyResults[index].imageURL;
      const songName = spotifyResults[index].name;
      const songArtists = spotifyResults[index].artists;

      // Redirect to the addSongFromSearch page with query parameters
      redirectToAnotherPage(trackID, imageURL, songName, songArtists);
    }
  });
});