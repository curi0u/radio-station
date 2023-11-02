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

    // Function to redirect to another page with query parameters
    function redirectToAnotherPage(imageURL, songName, songArtist) {
      const url = `/addSongFromSearch?imageURL=${encodeURIComponent(imageURL)}&songName=${encodeURIComponent(songName)}&songArtist=${encodeURIComponent(songArtist)}`;
      window.location.href = url;
    }

    // Function to generate dummy data with varying numbers
    function generateDummyData(count) {
      const dummyData = [];
  
      for (let i = 1; i <= count; i++) {
        dummyData.push({
          name: `Song Name #${i}`,
          artist: `Artist Name #${i}`,
          album: `Album Name #${i}`,
          duration: '0:00'
        });
      }
  
      return dummyData;
    }
  
    // Function to display a specified number of results
    function displayResults(results, count) {
      // Clear previous results
      searchResultsContainer.innerHTML = '';
  
      // Loop through the specified number of results and create HTML for each result
      for (let i = 0; i < count; i++) {
        const result = results[i];
        if (result) {
          const resultHTML = createResultHTML(result);
          // Append the result HTML to the container
          searchResultsContainer.innerHTML += resultHTML;
        }
      }
  
      // Show or hide the "View More" button based on the number of results
      if (results.length >= displayedResultsCount) {
        viewMoreButton.style.display = 'block';
      } else {
        viewMoreButton.style.display = 'none';
      }
  
      // Show or hide the no results message based on the number of results
      noResultsMessage.style.display = results.length === 0 ? 'block' : 'none';
    }
  
    // Function to create HTML for a single result
    function createResultHTML(result) {
      return `
        <div class="song-box">
          <!-- Customize this part based on your data structure -->
          <img src="/temp_music_icon.png" alt="Song Image">
          <div class="info-box">
            <p class="song-name">${result.name}</p>
            <p class="artist-name">${result.artist}</p>
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
  
    // Event listener for the search bar
    searchBar.addEventListener('input', function () {
      query = searchBar.value.toLowerCase();
  
      if (query.trim() !== '') {
        // Generate dummy data with varying numbers
        const dummyData = generateDummyData(displayedResultsCount);
  
        // Filter dummy data based on the search query
        const filteredResults = dummyData.filter(result => result.name.toLowerCase().includes(query) || result.artist.toLowerCase().includes(query));
  
        // Display the initially specified number of filtered results
        displayResults(filteredResults, displayedResultsCount);
      } else {
        displayResults([], 0);
      }
    });
  
    // Event listener for the "View More" button
    viewMoreButton.addEventListener('click', function () {
      // Increase the number of displayed results
      if (displayedResultsCount == MAXRESULTS) {
        alert("Max amount of results reached!")
      }
      displayedResultsCount = (displayedResultsCount === MAXRESULTS) ? MAXRESULTS : displayedResultsCount + 5;
    
      // Generate dummy data with the updated number of results
      const dummyData = generateDummyData(displayedResultsCount);
  
      // Filter dummy data based on the search query
      const filteredResults = dummyData.filter(result => result.name.toLowerCase().includes(query) || result.artist.toLowerCase().includes(query));
  
      // Display the updated number of filtered results
      displayResults(filteredResults, displayedResultsCount);
    });
  
    // Event listener for the "Favorite" and "Play" buttons
    searchResultsContainer.addEventListener('click', function (event) {
      // Find the corresponding song name
      const songName = event.target.closest('.song-box').querySelector('.song-name').textContent;
  
      // Check if "Favorite" button waas clicked
      if (event.target.classList.contains('favorite-button')) {
  
        // Show an alert with the added song name to favorites
        alert(`Added ${songName} to favorites`);
      
      // Check if the "Play" button was clicked
      } else if (event.target.classList.contains('play-button')) {
        
        // Show an alert saying that the corresponding song is now playing
        alert(`Now playing ${songName}`)
      }
    });

    // Event listener for the "Add to playlist" button
    searchResultsContainer.addEventListener('click', function (event) {
      // Check if the "Add to playlist" button was clicked
      if (event.target.classList.contains('playlist-add-button')) {
        // Find the corresponding song info
        const songBox = event.target.closest('.song-box');
        const songName = songBox.querySelector('.song-name').textContent;
        const artistName = songBox.querySelector('.artist-name').textContent;
        const albumName = songBox.querySelector('.album-name').textContent;
        const duration = songBox.querySelector('.duration').textContent;
        const imageURL = songBox.querySelector('img').src;

        // Redirect to the addSongFromSearch page with query parameters
        redirectToAnotherPage(imageURL, songName, artistName);
      }
    });
});