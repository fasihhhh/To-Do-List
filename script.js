document.addEventListener("DOMContentLoaded", () => {
let inputBox = document.getElementsByTagName('input')[0];
let textSpace = document.getElementById('textHolder');
let addButton = document.getElementById('addButton');
let listSpace = document.getElementById('listBox');
let completeCount = 0;
let sizeOfList = 0;

let eachTaskCreationFunction =  (inputBoxValue) =>{ //created new task (each task)
    let eachTask = document.createElement('div');
    eachTask.className = 'each-task w-[90%] h-fit flex flex-row justify-center items-center gap-2 p-1 rounded-[10px] border-2 bg-[#D4D4D4] cursor-pointer hover:bg-[#d5d5d5] dark:text-black';
    eachTask.setAttribute('id' ,'eachTaskId')
    eachTask.setAttribute('boolCheckAT','uncompleted')
    //Checkbox img
    let CheckImg = document.createElement('img');
    CheckImg.className = `h-[20px] w-[20px] ml-[5px] mr-[5px]`
    CheckImg.setAttribute('id' ,'CheckBoxIcon')
    CheckImg.setAttribute('src','assets/circle-regular.svg')
    //text/task here
    let textHolder = document.createElement('div');
    textHolder.className = 'text w-[70%] sm:w-[330px] overflow-auto font-medium';
    let h3Tag = document.createElement('h3');
    h3Tag.className = 'text-[1.2rem]/[24px] p-1 text-center';
    h3Tag.textContent = `${inputBoxValue}`
    textHolder.appendChild(h3Tag);
    //Trash img
    let DelImg = document.createElement('img');
    DelImg.className = `h-[20px] w-[20px] ml-[5px] mr-[5px]`
    DelImg.setAttribute('id' ,'DeleteIcon')
    DelImg.setAttribute('src','assets/trash-solid.svg')

    eachTask.appendChild(CheckImg)
    eachTask.appendChild(textHolder)
    eachTask.appendChild(DelImg)
    // listSpace.appendChild(eachTask);
    listSpace.prepend(eachTask); //eachtask appened to parent div listspace
    // ------------------------------------
    // localStorage.setItem('eachTask' , eachTask.innerText);
    // window.addEventListener('click',()=>{
    //     let LocalGotVar = localStorage.getItem('eachTask');
    // })    
    // // localStorage.getItem('eachTask' , h3Tag.textContent );   //tried to implement localstorage, did'nt work
    // // window.addEventListener('load', () =>{
    // //     let storedVar = localStorage.getItem('eachTask');
    // //     h3Tag.textContent = storedVar;
    // // })
    // ---------------------------
    // newly implemented logic
    let boolCheck = true;   
    let completionFunction = () =>{      //this functoni checks if eactaks div has been click or not used toggle for this.
        if (boolCheck){
            eachTask.style.backgroundColor = "#327532";
            eachTask.classList.add('border-amber-800')
            CheckImg.setAttribute('src', 'assets/circle-check-regular.svg');
            textHolder.style.textDecoration = "line-through";
            textHolder.style.color = "white";
            boolCheck = false;
            completeCount = completeCount + 1;
            eachTask.setAttribute('boolCheckAT','completed')
            console.log(eachTask.getAttribute('boolCheckAT'))
        } else {
            eachTask.style.backgroundColor = "#D4D4D4";
            eachTask.classList.remove('border-amber-800')
            CheckImg.setAttribute('src', 'assets/circle-regular.svg');
            textHolder.style.textDecoration = "none";
            textHolder.style.color = "black";
            boolCheck = true;
            completeCount = completeCount - 1;
            eachTask.setAttribute('boolCheckAT','uncomlpeted')
            console.log(eachTask.getAttribute('boolCheckAT'))
        } 
        completeCountFunction();
    }

CheckImg.addEventListener('click', completionFunction);
textHolder.addEventListener('click', completionFunction);
DelImg.addEventListener('click', deletionFunction);
sizeOfListFunction();

}
let addFunction = () => {    //adds new task whenever add btn clicked
    inputBoxValue = inputBox.value;
    inputBox.value = "";
    if(inputBoxValue==""){
        alert("Please Enter something")
        console.log("Please Enter something")
    }
    else{
        sizeOfList = sizeOfList + 1 ;
        eachTaskCreationFunction(inputBoxValue);
    }
}
let sizeOfListFunction = () =>{
    totalItems.innerHTML = `List Size : 0 `
    totalItems.innerHTML = `List Size : ${sizeOfList}`
}

let deletionFunction = (e) => {
    const taskDiv = e.target.closest(".each-task");
    taskDiv.remove(); 
    sizeOfList = sizeOfList - 1 ;
    console.log(taskDiv.getAttribute('boolCheckAT'))
    if(taskDiv.getAttribute('boolCheckAT')=='completed'){  //to ensure that if completed one tsk is being deleted then completed size reduce
        completeCount = completeCount - 1;
    }
    sizeOfListFunction();
    completeCountFunction();
}

let clearAllFuntion = (e) =>{
    while (listSpace.hasChildNodes()) {
        listSpace.removeChild(listSpace.firstChild);
      }
      completeCount = 0 ;
      sizeOfList = 0;
      sizeOfListFunction();
      completeCountFunction();
      
}

let completeCountFunction = () =>{
    completedItems.innerHTML = `Completed : ${completeCount}`;
}

addButton.addEventListener('click',addFunction)
deleteAll.addEventListener('click',clearAllFuntion)
sizeOfListFunction();
completeCountFunction();

});