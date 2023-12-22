showNotes();
addFavorite();


// add note to localstorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTitle = document.getElementById('addTitle');
    let addText = document.getElementById('addText');
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addText.value
    }
    if(myObj.title != '' && myObj.text != ''){
        notesObj.push(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTitle.value = "";
        addText.value = "";
    }
    showNotes();
});


// function to show element from localStorage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        if(element.title || element.text){
            html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick="showPopUp()" class="btn btn-primary">Delete</button>
                    <button id="${index}" onclick="favorites(this.id)" class="btn btn-primary" id="faves">Favorite</button>
                </div>
            </div>`;
        }
    });

    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

// show pop-Up menu

let popUp = document.getElementById('popUp');
let close = document.getElementById('close');

function showPopUp(){
    popUp.style.opacity = '10';
    popUp.style.visibility = 'visible';
}


function closePop(){
    popUp.style.opacity = '0';
    popUp.style.visibility = 'hidden';
}


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


// function to add item in favorite cart
function favorites(index){
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let favItem = localStorage.getItem("favItem");
    if (favItem == null) {
        favObj = [];
    } else {
        favObj = JSON.parse(favItem);
    }

    let selectedNote = notesObj[index];
    if(!isNotInFavorites(selectedNote)){
        favObj.push(selectedNote);
        localStorage.setItem("favItem", JSON.stringify(favObj));
    }else{
        alert('this note is already in favorites')
    }

    showNotes();
    addFavorite();
};


// function to check the card is exist or not in favorites
function isNotInFavorites(selectedNote){
    for(let i = 0; i < favObj.length; i++){
        if(favObj[i].title === selectedNote.title && favObj[i].text === selectedNote.text)
        {
            return true;
        }
    }
    return false;
}


// function to show items
function addFavorite(){
    let favItem = localStorage.getItem("favItem");
    if (favItem == null) {
        favObj = [];
    } else {
        favObj = JSON.parse(favItem);
    }

    let sidebarItem = "";
    favObj.forEach(function(element, index){
        if(element.title || element.text){
            sidebarItem += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="removeFav_${index}" onclick="removeFromFavorites(${index})" class="btn btn-primary">Remove from favorites</button>
                </div>
            </div>`;
        };
    });

    let favElm = document.getElementById('sidebar');
    if(favElm.length != 0){
        favElm.innerHTML = sidebarItem;
    }else{
        favElm.innerHTML = "No favorites added yet";
    }
};


// function to remove items
function removeFromFavorites(index){
    let favItem = localStorage.getItem("favItem");
    if (favItem == null) {
        favObj = [];
    } else {
        favObj = JSON.parse(favItem);
    }

    favObj.splice(index, 1);
    localStorage.setItem("favItem", JSON.stringify(favObj));
    addFavorite();
};


// show error if user not insert value in input 
let showErrorMessages = document.getElementById('showErrorMessages');
let showErrorMsg = document.getElementById('showErrorMsg');
let addTitleElm = document.getElementById('addTitle');
let addTextElm = document.getElementById('addText');

function showErrors(){

    showErrorMessages.style.display = 'none';
    showErrorMsg.style.display = 'none';

    if (addTitleElm.value == "" && addTextElm.value == "") {
        showErrorMessages.innerText = 'Please Enter a Title';
        showErrorMsg.innerText = 'Please Enter a Description';

        showErrorMessages.style.display = 'block';
        showErrorMsg.style.display = 'block';
        event.preventDefault();
    } else if (addTitleElm.value == "") {
        showErrorMessages.innerText = 'Please Enter a Title';
        showErrorMessages.style.display = 'block';
        event.preventDefault();
    } else if (addTextElm.value == "") {
        showErrorMsg.innerText = 'Please Enter a Description';
        showErrorMsg.style.display = 'block';
        event.preventDefault();
    }
}


// searching notes

let searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener('input', function(){
    let inputVal = searchTxt.value;
    // console.log('input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTitle = element.getElementsByTagName('h5')[0].innerText;
        let cardText = element.getElementsByTagName('p')[0].innerText;
        // console.log(cardText);
        if(cardText.includes(inputVal) || cardTitle.includes(inputVal)){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
    });
    
});