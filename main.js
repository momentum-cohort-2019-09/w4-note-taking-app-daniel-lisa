/* globals fetch */

function displayAllNotes() {
    return fetch('https://notes-api.glitch.me/api/notes', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa('Team410:password')
            }
        })
        .then(response => response.json())
        .then(function(JSONresponse) {
            const notes = JSONresponse.notes
            const noteDiv = document.querySelector('#notes-container')
            for (let note of notes) {
                let newDiv = document.createElement('div')
                newDiv.innerHTML =
                    `<div id="actualNote">

                    <div class="noteTitle">
                        <h3>${note.title}</h3>
                    </div>
        
                    <div class="noteContent">
                        <p>${note.text}</p>
                    </div>

                    <div class="editNoteButtonBackground">
                        <button class="editNoteButton" id="${note.id}">Edit Note</button>
                    </div>

                    <div class="deleteNoteButtonBackground">
                        <button class="deleteNoteButton" id="${note.id}">Delete Note</button>
                    </div>
                    
                </div>`
                noteDiv.append(newDiv)
            }
        })
}

function addNewNote(title, text) {

    let addNewNoteFrom = document.querySelector('#addNewNoteForm')
    return fetch('https://notes-api.glitch.me/api/notes', {
            method: 'POST',
            body: JSON.stringify({
                'title': title,
                'text': text
            }),
            headers: {
                'Authorization': 'Basic ' + btoa('Team410:password'),
                'Content-Type': 'application/json'
            }
        })
        .then(response => {})
    if (response.ok) {
        addNewNoteForm.reset()
    }
}

function deleteNote(noteId) {
    return fetch('https://notes-api.glitch.me/api/notes/', {
            method: 'DELETE',
            headers: {
                'Authorization': 'Basic ' + btoa('Team410:password'),
                'Content-Type': 'application/json'
            }
        })
        .then(response => {})
}


function main() {

    document.querySelector('#addNewNoteForm').addEventListener('submit', function(event) {
        event.preventDefault()

        const title = document.querySelector('#addNewNoteTitle')
        const text = document.querySelector('#addNewNoteText')

        addNewNote(`${title.value}`, `${text.value}`)
    })

    document.querySelector('#notes-container').addEventListener('click', function(event) {
        event.preventDefault()

        deleteNote()
        displayAllNotes()
    })


}
displayAllNotes()
main()