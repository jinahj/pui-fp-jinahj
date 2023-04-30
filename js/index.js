//Create list to store all entries 
let allEntries = []; 
let openedEntries = [];

//Create object for entry 
class Entry{
  
  constructor(entryColor, entryContent, entryKeyword){
    this.color = entryColor; 
    this.content = entryContent; 
    this.keyword = entryKeyword; 
  }
  
}

function addNewEntry(noteColor, noteContent, noteKeyword){
  const entry = new Entry(noteColor, noteContent, noteKeyword); 
  allEntries.push(entry); 
}

//retrieve from local storage and append each item to the DOM 
function retrieveFromLocalStorage() {
  const entriesArrayString = localStorage.getItem('storedEntries');
  const entriesArray = JSON.parse(entriesArrayString);
  allEntries = entriesArray; 

  /* create a circle inside the 'entries-box' class for each entry and set the color accordingly */ 

  for (const entryData of entriesArray){
    const para = document.createElement("p"); 
    para.classList.add('entry-circle'); 
    para.style.backgroundColor = entryData.color; 

    const containerElem = document.querySelector(".entries-box"); 
    containerElem.appendChild(para); 
  }
}


if (localStorage.getItem('storedEntries') != null){
  retrieveFromLocalStorage(); 
}

if (localStorage.getItem('openedEntries') != null){
  const entriesArrayString = localStorage.getItem('openedEntries');
  const entriesArray = JSON.parse(entriesArrayString);
  openedEntries = entriesArray; 
}



/*----------------------------------------------------------------------------*/

const open = document.getElementById('open'); 

const modal_container = document.getElementById('modal_container'); 

const close = document.getElementById('close'); 

open.addEventListener('click', () => {
 modal_container.classList.add('show');
 showModalEntry()
}); 

close.addEventListener('click', () => {
modal_container.classList.remove('show');

saveToLocalStorage();
const containerElem = document.querySelector(".entries-box");
containerElem.remove(); 
const newContainer = document.createElement('div'); 
newContainer.className = "entries-box"; 
document.body.appendChild(newContainer); 
retrieveFromLocalStorage();
});

/* randomly choose an entry from 'entriesArray' and display it in the pop up */

function saveToLocalStorage(){
  const entriesArrayString = JSON.stringify(allEntries);
  localStorage.setItem('storedEntries', entriesArrayString);  
}



function showModalEntry(){
  if (allEntries.length > 0){
    const randomIndex = Math.floor(Math.random() * allEntries.length);
    const randomEntry = allEntries[randomIndex];
    const popupBox = document.querySelector('.entry-box'); 
    popupBox.style.backgroundColor = randomEntry.color;
    popupBox.textContent = randomEntry.content;  

    const date = document.querySelector('.prev-date'); 
    date.innerText = randomEntry.date; 

    openedEntries.push(allEntries[randomIndex]); 
    allEntries = rebuildArray(randomIndex, allEntries); 
    
    // update and append openedEntries to local storage 
    const openedArrayString = JSON.stringify(openedEntries); 
    localStorage.setItem('openedEntries', openedArrayString); 

    console.log(allEntries);
    console.log(openedEntries);
  }
}


/* use function to delete opened entry from the entries collection*/ 
function rebuildArray(index, array){
  let newArray = []; 
  for (let i=0; i < array.length; i++){
    if (i != index){
      newArray.push(array[i]); 
    }
  }

  return newArray; 
}

// display current date
function getDate(){
  const date = new Date(); 
  let day = date.getDate(); 
  let month = date.getMonth() + 1; 
  let year = date.getFullYear(); 
  let dayOfWeek = date.getDay(); 

  if (dayOfWeek == 0) {dayOfWeek = "Sunday";}; 
  if (dayOfWeek == 1) {dayOfWeek = "Monday";}; 
  if (dayOfWeek == 2) {dayOfWeek = "Tuesday";}; 
  if (dayOfWeek == 3) {dayOfWeek = "Wednesday";}; 
  if (dayOfWeek == 4) {dayOfWeek = "Thursday";}; 
  if (dayOfWeek == 5) {dayOfWeek = "Friday";}; 
  if (dayOfWeek == 6) {dayOfWeek = "Saturday";};
  
  if (month == 1) {month = "January";};
  if (month == 2) {month = "February";};
  if (month == 3) {month = "March";};
  if (month == 4) {month = "April";};
  if (month == 5) {month = "May";};
  if (month == 6) {month = "June";};
  if (month == 7) {month = "July";};
  if (month == 8) {month = "August";};
  if (month == 9) {month = "September";};
  if (month == 10) {month = "October";};
  if (month == 11) {month = "November";};
  if (month == 12) {month = "December";};

  // Example Format: (SUNDAY) January 1, 2023

  let fullDate = `(${dayOfWeek}) ${month} ${day}, ${year}`
  return fullDate; 
} 

let displayCurrDate = document.querySelector("#current-date"); 
displayCurrDate.textContent = getDate();

// if there are no entries in the box, alert that there are no entries to display 

if (allEntries.length == 0){
  let entriesBox = document.querySelector(".entries-box"); 
  let message = document.createElement("h3"); 
  message.textContent = "There are no more entries to open. Add new good & happy things!"; 
  entriesBox.appendChild(message); 
}








