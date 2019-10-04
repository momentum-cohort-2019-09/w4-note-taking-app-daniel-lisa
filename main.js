/* globals fetch */

function query(selector) { //assigned the selector of 'query' to a function.//
    return document.querySelector(selector)
}

function queryAll(selector) { //assigned the selector of 'queryAll' to a function.//
    return document.querySelectorAll(selector)
}

function addAuthHeader(headers) {
    if (!headers) {
        headers = {};
    }

    return Object.assign({}, headers, {
        Authorization: "Basic Team410:password"
    });
}

function displayAllNotes() {
    fetch("https://notes-api.glitch.me/api/notes", {
            headers: {
                //addAuthHeader({ 'Content-Type': 'application/json' })
                Authorization: "Basic " + btoa("Team410:password")
            }
        })
        .then(response => response.json())
        .then(json => {
            for (let note of json.notes) {
                let noteDiv = document.querySelector("#notes-container");

                noteDiv.innerHTML +=
                    `<div id="actualNote">
                <div class="noteTitle">
                    <h3>${note.title}</h3>
                </div>
                <div class="noteContent">
                    <p>${note.text}</p>
                </div>
                </div>`
            }
        });
}

query("#saveNoteInput").addEventListener('click', function() {
    event.preventDefault()
})

displayAllNotes();