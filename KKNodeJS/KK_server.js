const express = require("express")
const mongoose = require("mongoose")    //connects to mongoose
const app = express()
const port = 8080   //port number

main().catch(err => console.log(err));  //catches any errors when running 

//Creates a connection with the database
async function main() {
  await mongoose.connect('mongodb://localhost:27017/Iteration5');

  //Schema used to record DJ and Genre values
  const DJSchema = new mongoose.Schema({
    DJ: String
  });

  const GenreSchema = new mongoose.Schema({
    Genre: String
  });
  
  //Data Population
  const DJ_Entry = mongoose.model('DJ_Entry', DJSchema);
  const Genre_Entry = mongoose.model('Genre_Entry', GenreSchema);

  const dj_entry1 = new DJ_Entry({ DJ: 'Marshmellow' });
  await dj_entry1.save();

  const dj_entry2 = new DJ_Entry({ DJ: 'Alan Walker' });
  await dj_entry2.save();

  const dj_entry3 = new DJ_Entry({ DJ: 'The Chainsmokers' });
  await dj_entry3.save();

  const genre_entry1 = new Genre_Entry({ Genre: 'Pop' });
  await genre_entry1.save();

  const genre_entry2 = new Genre_Entry({ Genre: 'Rock' });
  await genre_entry2.save();

  const genre_entry3 = new Genre_Entry({ Genre: 'Jazz' });
  await genre_entry3.save();
}

// Accessing Static Files
app.use(express.static("public"))
app.use("/css", express.static(__dirname + "public/css"))
app.use("/img", express.static(__dirname + "public/img"))
app.use("/js", express.static(__dirname + "public/js"))
app.use(express.urlencoded({extended: false}))

// Retrieves the ejs files from the views folder
app.set("views", "./views")
app.set("view engine", "ejs")

// By default, it will start with the userPreferences Screen
app.get("/preferences", (req, res) => {
    res.render("userPreferences")
})

app.get("/suggestions", (req, res) => {
    res.render("userSuggestions")
})

// Lets the user know that port is running
app.listen(port, () => console.info("Listening on port 8080"))

