function SuggestionForm() 
{
  alert("Your DJ Artist or genre suggestion has been submitted!");
}

let userPreferences =
{
  favGenres: "",
  favArtists: "",
};

function nextFunction() 
{
  alert("\'Next\' Button has been clicked");
  console.log(userPreferences.favGenres);
  console.log(userPreferences.favArtists);
}

document.getElementById("nextBtn").addEventListener("click", nextFunction);

function genreFunc(genre) {
  var btnVal = genre.innerText;
  alert(btnVal + ' has been added to your preferences.');
  userPreferences.favGenres = userPreferences.favGenres + genre.innerText + " ";
  console.log(btnVal);
}

function artistFunc(artist) {
  var btnVal2 = artist.innerText;
  alert(btnVal2 + ' has been added to your preferences.');
  userPreferences.favArtists = userPreferences.favArtists + artist.innerText + " ";
  console.log(btnVal2);
}
