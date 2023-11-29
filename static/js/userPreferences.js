function genreSuggestionForm() {
    let x = document.forms["genreForm"]["genre"].value;
    if (x == " ") {
        alert("Error! Genre must be filled out.");
        return false;
    }
    else {
        alert("Your genre suggestion of '" + x + "'' has been submitted.");
        return true;
    }
}

function artistSuggestionForm() {
    let y = document.forms["artistForm"]["artist"].value;
    if (y == " ") {
        alert("Error! DJ artist must be filled out.");
        return false;
    }
    else {
        alert("Your DJ Artist suggestion of '" + y + "' has been submitted.");
        return true;
    }
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
  alert(btnVal + ' Button has been clicked');
  userPreferences.favGenres = userPreferences.favGenres + genre.innerText + " ";
  console.log(btnVal);
}

function artistFunc(artist) {
  var btnVal2 = artist.innerText;
  alert(btnVal2 + ' Button has been clicked');
  userPreferences.favArtists = userPreferences.favArtists + artist.innerText + " ";
  console.log(btnVal2);
}
