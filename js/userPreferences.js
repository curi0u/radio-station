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

function nextFunction() 
{
  alert("\'Next\' Button has been clicked");
  console.log(userPreferences.favGenres);
  console.log(userPreferences.favArtists);
}
