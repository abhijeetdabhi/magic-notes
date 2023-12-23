addFavorite();

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
        favPopUpMenu();
        let timOut = setTimeout(removeFavPopUp, 3000);
    }else{
        alert('this note is already in favorites')
    }
    showNotes();
    addFavorite();
};

// add note successfully
let favPopUp = document.getElementById('favPopUp');

function favPopUpMenu(){
    favPopUp.style.transform = 'translateY(0px)';
    favPopUp.style.transition = 'all 0.6s ease-in-out';
}

function removeFavPopUp(){
    favPopUp.style.transform = 'translateY(-60px)';
    console.log('remove')
}

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
