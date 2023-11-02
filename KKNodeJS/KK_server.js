const express = require("express")
const app = express()
const port = 8080   //port number

// Accessing Static Files
app.use(express.static("public"))
app.use("/css", express.static(__dirname + "public/css"))
app.use("/img", express.static(__dirname + "public/img"))
app.use("/js", express.static(__dirname + "public/js"))

// Retrieves the ejs files from the views folder
app.set("views", "./views")
app.set("view engine", "ejs")

// By default, it will start with the userPreferences Screen
app.get("", (req, res) => {
    res.render("userPreferences")
})

app.get("/suggestions", (req, res) => {
    res.render("userSuggestions")
})

// Lets the user know that port is running
app.listen(port, () => console.info("Listening on port 8080"))
