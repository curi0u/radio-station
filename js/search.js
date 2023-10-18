function alertSearch(text) {
    window.alert("Searching: " + text)
}

// Event Types, Demonstrates use of Javascript Fundamentals
document.addEventListener("DOMContentLoaded", event => {
    let searchText = document.querySelector("#search-bar-input")

    searchText.addEventListener("keydown", event => {
        if (event.isComposing || event.keyCode === 229) {
            return;
        }

        // If the enter key is pressed
        if (event.keyCode == 13) {
            alertSearch(searchText.value)
        }
    })

    document.querySelector("#search-button").addEventListener("click", event => {
        alertSearch(searchText.value)
    })
})