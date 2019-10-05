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
                Authorization: "Basic " + btoa("Team410:password")
            }
        })
        .then(response => response.json())
        .then(json => {
            for (let note of json.notes) {
                let noteDiv = document.querySelector("#notes-container");

                noteDiv.innerHTML +=
                    `<div class="box1"></div>
                        <div id="actualNote">
                            <div class="noteTitle">
                                <h3>${note.title}</h3>
                            </div>
                            <div class="noteContent">
                                <p>${note.text}</p>
                            </div>
                            <form id="deleteButtonForm">
                                <button class="deleteNote">Delete</button>
                            <form>
                        </div>`
            }
        });
}

query("#addNewNoteForm").addEventListener('submit', function(addNewNote) {
    event.preventDefault()
    fetch("https://notes-api.glitch.me/api/notes", {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            text: text
        }),
        headers: {
            'Authorization': "Basic " + btoa("Team410:password"),
            'Content-Type': 'application/json'

        }
    })
})

displayAllNotes();