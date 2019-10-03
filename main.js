/* globals fetch */

function addAuthHeader(headers) {
    if (!headers) { headers = {} }

    return Object.assign({}, headers, {
        'Authorization': "Basic Team410:password"
    })
}

function displayAllNotes() {
    fetch("https://notes-api.glitch.me/api/notes", {
            headers: {
                //addAuthHeader({ 'Content-Type': 'application/json' })
                'Authorization': "Basic " + btoa("Team410:password")
            }
        })
        .then(response => response.json())
        .then(json => console.log(json))
} 
displayAllNotes()