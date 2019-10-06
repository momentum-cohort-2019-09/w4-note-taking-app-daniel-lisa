/* globals fetch */

// const app = {

function displayAllNotes() {
    return fetch('https://notes-api.glitch.me/api/notes', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic' + btoa(`Team410:password`)
            }
        })
        .then(response => response.json())
        .then(function(JSONresponse) {
            const notesArray = JSONresponse.notesArray
            for (let note of notesArray) {
                const title = title
                const text = text
                const noteDiv = document.querySelector('#notes-container')
                noteDiv.innerHTML =
                    `<div id="actualNote">

                    <div class="noteTitle">
                        <h3>${note.title}</h3>
                    </div>
        
                    <div class="noteContent">
                        <p>${note.text}</p>
                    </div>
                        <button class="deleteNoteButton id="${note.id}">Delete Note</button>
                </div>`
            }
        })
}

function addNewNote(title, text) {
    return fetch('https://notes-api.glitch.me/api/notes', {
            method: 'POST',
            body: JSON.stringify({
                'title': title,
                'text': text
            }),
            headers: {
                'Authorization': 'Basic' + btoa(`Team410:password`),
                'Content-Type': 'application/json'
            }
        })
        .then(response => {})
}

function deleteNote(noteId) {
    return fetch('https://notes-api.glitch.me/api/notes' + noteId, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Basic' + btoa(`Team410:password`),
                'Content-Type': 'application/json'
            }
        })
        .then(response => {})
}

// writeNoteToHTML: function(note) {
//     return
// },


function renderAllNotes() {
    this.displayAllNotes().then(() => this.renderAllNotes())
}


function main() {

    document.querySelector('#addNewNoteForm').addEventListener('submit', function(event) {
        event.preventDefault()

        const title = document.querySelector('#addNewNoteTitle')
        const text = document.querySelector('#addNewNoteText')

        addNewNote(title, text)
        displayAllNotes()
        renderAllNotes()
    })

    document.getElementById('notes-container').addEventListener('click', function(event) {
            event.preventDefault()

            const noteId = event.target.id

            deleteNote(noteId)
            displayAllNotes()
            renderAllNotes()
        })
        // }
}
main()