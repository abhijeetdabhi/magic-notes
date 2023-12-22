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