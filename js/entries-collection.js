// retrieve from local storage and append each imte to the DOM

if (localStorage.getItem('openedEntries') != null){
  const entriesArrayString = localStorage.getItem('openedEntries'); 
  const entriesArray = JSON.parse(entriesArrayString); 

  for (const entryData of entriesArray){
    const para = document.createElement("p"); 
    para.classList.add('keyword-box'); 
    para.style.backgroundColor = entryData.color; 
    para.innerText = entryData.keyword; 

    const numChar = (entryData.keyword).length; 
    const calcWidth = numChar*10; 
    para.style.width = `${calcWidth}px`
  
    const containerElem = document.querySelector(".entries-box"); 
    containerElem.appendChild(para); 
  }  
}

