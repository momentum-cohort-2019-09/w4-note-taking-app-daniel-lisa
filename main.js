/* globals fetch */

const app = {

    data: {
        credentials: {
            username: sessionStorage.getItem('username'),
            password: sessionStorage.getItem('password')
        },
        notes: []
    },

    setCredentials: function(username, password) {
        this.data.credentials = {
            username: username,
            password: password
        }
        sessionStorage.setItem('username', username)
        sessionStorage.setItem('password', password)
    },

    addAuthorization: function(headers) {
        if (!headers) { headers = {} }
        return Object.assign({}, headers, {
            'Authorization': 'Basic ' + btoa(`Team410:password`)
        })
    },

    login: function(username, password) {
        fetch('https://notes-api.glitch.me/api/notes', {
                headers: {
                    'Authorization': 'Basic ' + btoa(`Team410:password`)
                }
            })
            .then(response => {
                if (response.ok) {
                    this.setCredentials(username, password)
                    this.render()
                } else {
                    document.getElementById('login-error').innerText = 'That is not a valid username and password.'
                }
            })
    },

    displayAllNotes: function() {
        return fetch("https://notes-api.glitch.me/api/notes", {
                headers: app.addAuthorization()
            })
            .then(response => response.json())
            .then(notesData => {
                this.data.notes = notesData.notes
            })
    },

    addNewNote: function(title, text) {
        return fetch("https://notes-api.glitch.me/api/notes", {
                method: 'POST',
                body: JSON.stringify({
                    "title": title,
                    "text": text
                }),
                headers: this.addAuthorization({
                    'Content-Type': 'application/json'
                })
            })
            .then(response => {})
    },

    deleteNote: function(noteId) {
        return fetch("https://notes-api.glitch.me/api/notes" + noteId, {
                method: 'DELETE',
                headers: this.addAuthorization({
                    'Content-Type': 'application/json'
                })
            })
            .then(response => {})
    },

    writeNoteToHTML: function(note) {
        return `
        <div id="actualNote">

            <div class="noteTitle">
                <h3>${note.title}</h3>
            </div>

            <div class="noteContent">
                <p>${note.text}</p>
            </div>

            <div class="timeOfNewNote">
                Timestamp: ${note.updated}
            </div>
                <button class="deleteNoteButton id="${note.id}">Delete Note</button>
        </div>`
    },

    renderAllNotes: function() {
        document.getElementById('notes-container').innerHTML = this.data.notes.map(this.writeNoteToHTML).join('\n')
    }
}

function main() {
    app.renderAllNotes()

    document.querySelector('#addNewNoteForm').addEventListener('submit', function(event) {
        event.preventDefault()

        const noteFormData = new FormData(noteForm)
        const title = noteFormData.get('addNewNoteTitle')
        const text = noteFormData.get('addNewNoteText')

        app.addNewNote(title, text)
        app.displayAllNotes()
        app.renderAllNotes()
    })

    document.getElementById('notes-container').addEventListener('click', function(event) {
        event.preventDefault()

        const noteId = event.target.id

        app.deleteNote(noteId)
        app.displayAllNotes()
        app.renderAllNotes()
    })
}

main()