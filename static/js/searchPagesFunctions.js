// Shared module for both search pages
let spotifyResults;

// Function to get Spotify API access token using Client Credentials Flow
const getSpotifyAccessToken = async (clientId, clientSecret) => {
  // Base64 encode the client ID and client secret
  const credentials = btoa(`${clientId}:${clientSecret}`);

  try {
    // Make a POST request to the Spotify Accounts service to get an access token
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.access_token;
      // Use the access token to make requests to the Spotify API
      console.log('Access Token:', accessToken);
      return accessToken;
    } else {
      console.error('Error:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
};

// Function to search for tracks using the Spotify API
const searchSpotify = async (query, accessToken, limit = 5) => {
  // Create a Spotify API search endpoint URL
  const apiUrl = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=${limit}`;

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
      spotifyResults = data.tracks.items.map(item => ({
        id: item.id, // Each track has a unique Spotify ID
        name: item.name,
        artists: item.artists.map(artist => artist.name).join(', '),
        album: item.album.name,
        duration: `${Math.floor(item.duration_ms / 60000)}:${((item.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}`,
        imageURL: item.album.images.length > 0 ? item.album.images[0].url : defaultImageUrl, // Use a default image URL if images array is empty
      }));
      
      return spotifyResults;
    } else {
      // Handle error response from the Spotify API
      console.error('Error:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
};

export { getSpotifyAccessToken, searchSpotify, spotifyResults };