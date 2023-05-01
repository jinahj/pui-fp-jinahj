// retrieve from local storage and append each imte to the DOM

let count = 0;

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
    currIndex++; 
  
    const containerElem = document.querySelector(".entries-box"); 
    containerElem.appendChild(para); 
  }
}

// for modal 