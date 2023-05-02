// retrieve from local storage and append each imte to the DOM

let count = 0;
const entriesArrayString = localStorage.getItem('openedEntries'); 
const entriesArray = JSON.parse(entriesArrayString); 


if (localStorage.getItem('openedEntries') != null){
  const containerElem = document.querySelector(".entries-box"); 
  containerElem.textContent = ""; 
  count++; 
}

if (localStorage.getItem('openedEntries') != null){ 
  const entriesArrayString = localStorage.getItem('openedEntries'); 
  const entriesArray = JSON.parse(entriesArrayString); 

  let currIndex = 0; 

  for (const entryData of entriesArray){
    const para = document.createElement("p"); 
    para.classList.add('keyword-box'); 
    para.style.backgroundColor = entryData.color; 
    para.innerText = entryData.keyword; 

    // associate a value as an attribute
    para.setAttribute('value',currIndex);
    
    // when this new element is clicked, it should show the respective entry associated to the keyword box 
    
    para.classList.add("btn"); 
    para.setAttribute('onclick', "openPopup()"); 
    currIndex++; 
  
    const containerElem = document.querySelector(".entries-box"); 
    containerElem.appendChild(para); 
  }
}

// for pop up

let popup = document.getElementById("popup"); 

function openPopup(){
  popup.classList.add('open-popup');
}
 
function closePopup(){
  popup.classList.remove('open-popup');
}

const buttons = document.querySelectorAll(".keyword-box"); 

const buttonPressed = e => {
  const clickedEntry = e.target.getAttribute('value');
  
  // manipulate the popup 
  let circle = document.querySelector('#circle'); 
  circle.style.backgroundColor = entriesArray[clickedEntry].color; 

  let date = document.querySelector('#date'); 
  date.innerText = entriesArray[clickedEntry].date; 

  let entryInformation = document.querySelector('#entry-info'); 
  entryInformation.innerText = entriesArray[clickedEntry].content; 
  entryInformation.style.backgroundColor = entriesArray[clickedEntry].color; 
}

for (let button of buttons){
  button.addEventListener('click', buttonPressed); 
}