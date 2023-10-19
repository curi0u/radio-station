document.addEventListener('DOMContentLoaded', function () {
  // Max number of results to display
  const MAXPLAYLISTS = 20;
  // Initialized to number of initial results
  let playlistCount = 4;

  // Get references to input, result container, and view more button
  const playlistsContainer = document.getElementById('playlists');
  const viewMoreButton = document.getElementById('view-more-button');

  // Function to generate dummy data with varying numbers
  function generateDummyData(count) {
    const dummyData = [];

    for (let i = 1; i <= count; i++) {
      let randomAM = Math.floor(Math.random() * 12) + 1;
      let randomPM = Math.floor(Math.random() * 12) + 1;
      dummyData.push({
        name: `DJ #${i}'s Playlist`,
        timetable: {
          sunday: `${randomAM}AM-${randomPM}PM`,
          monday: `${randomAM}AM-${randomPM}PM`,
          tuesday: `${randomAM}AM-${randomPM}PM`,
          wednesday: `${randomAM}AM-${randomPM}PM`,
          thursday: `${randomAM}AM-${randomPM}PM`,
          friday: `${randomAM}AM-${randomPM}PM`,
          saturday: `${randomAM}AM-${randomPM}PM`
        }
      });
    }

    return dummyData;
  }

  // Function to display a specified number of results
  function displayResults(results, count) {
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
    return `
      <div class="playlist-box">
        <img src="img/temp_person_icon.png" alt="DJ Photo">
        <div class="info-box">
          <p class="playlist-name">${result.name}</p>
          <p class="song-count"># Songs</p>
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
            <td>${result.timetable.sunday}</td>
            <td>${result.timetable.monday}</td>
            <td>${result.timetable.tuesday}</td>
            <td>${result.timetable.wednesday}</td>
            <td>${result.timetable.thursday}</td>
            <td>${result.timetable.friday}</td>
            <td>${result.timetable.saturday}</td>
          </tr>
        </table>
        <div class="button-box">
          <button type="button" class="view-playlist-button">View playlist</button>
          <button type="button" class="add-to-playlist-button" data-index="${index}">Add to this playlist</button>
        </div>
      </div>
    `;
  }

  function setUpAddToPlaylistButtons(dummyData) {
    // Add event listeners for "Add to playlist" buttons
    const addToPlaylistButtons = document.querySelectorAll('.add-to-playlist-button');
    addToPlaylistButtons.forEach((button) => {
      button.addEventListener('click', function () {
        // Retrieve the playlist name based on the button's index
        const index = button.getAttribute('data-index');
        const playlistName = dummyData[index].name;

        // Access the song name from the header
        const songName = document.getElementById('song').textContent;

        // Display the alert
        alert(`Added "${songName}" to playlist "${playlistName}"`);
      });
    });
  }

  function generateInitialPlayists() {
    // Generate dummy data with the initial number of playlists
    const dummyData = generateDummyData(playlistCount);

    // Display the initial number of playlists
    displayResults(dummyData, playlistCount);

    setUpAddToPlaylistButtons(dummyData);
  }


  // Event listener for the "View More" button
  viewMoreButton.addEventListener('click', function () {
    // Alert if playlist count reaches the maximum
    if (playlistCount == MAXPLAYLISTS) {
      alert("Max amount of playlists displayed!");
    }

    // Increase the number of displayed playlists
    playlistCount = (playlistCount === MAXPLAYLISTS) ? MAXPLAYLISTS : playlistCount + 4;
    
    // Generate dummy data with the updated number of playlists
    const dummyData = generateDummyData(playlistCount);

    // Display the updated number of playlists
    displayResults(dummyData, playlistCount);

    setUpAddToPlaylistButtons(dummyData);
  });

  generateInitialPlayists();
});