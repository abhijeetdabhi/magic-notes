// Function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    popUp.style.visibility = 'hidden';
    showNotes();
}


// show pop-Up menu

let popUp = document.getElementById('popUp');
let close = document.getElementById('close');

let currentDeleteIndex;

function showPopUp(index){
    currentDeleteIndex = index;
    popUp.style.opacity = '10';
    popUp.style.visibility = 'visible';
}

function closePop(){
    popUp.style.opacity = '0';
    popUp.style.visibility = 'hidden';
}

function deleteItem(){
    deleteNote(currentDeleteIndex);
}

