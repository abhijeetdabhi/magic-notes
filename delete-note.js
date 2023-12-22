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
let body = document.getElementById('body');

let currentDeleteIndex;

function showPopUp(index){
    currentDeleteIndex = index;
    popUp.style.opacity = '10';
    popUp.style.visibility = 'visible';
    body.style.overflow = 'hidden';
    

    let inputTitle = document.getElementById('addTitle');
    let textarea = document.getElementById('addText');
    let addBtn = document.getElementById('addBtn');

    inputTitle.disabled = true;
    textarea.disabled = true;
    addBtn.disabled = true;

    let backgroundField = document.getElementsByClassName('background-field');
    for(let i = 0; i < backgroundField.length; i++){
        backgroundField[i].disabled = true;
    }
}

function closePop(){
    popUp.style.opacity = '0';
    popUp.style.visibility = 'hidden';
    body.style.overflow = 'scroll';

    let inputTitle = document.getElementById('addTitle');
    let textarea = document.getElementById('addText');
    let addBtn = document.getElementById('addBtn');

    inputTitle.disabled = false;
    textarea.disabled = false;
    addBtn.disabled = false;

    let backgroundField = document.getElementsByClassName('background-field');
    for(let i = 0; i < backgroundField.length; i++){
        backgroundField[i].disabled = false;
    }
}

function deleteItem(){
    deleteNote(currentDeleteIndex);
    closePop();
}

