let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

//Trigger Get data from Local Storage Function
getDataFromLocalStorage();

submit.onclick = function(){
    if(input.value !== ''){
        addTaskToArray(input.value);
        input.value = '';
    }
};

//Deleting And Updating data
tasksDiv.addEventListener("click", (e) => {
    //Deleting case
    if(e.target.classList.contains('del')){
        //Remove task From local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        //Remove element from Page
        e.target.parentElement.remove();
    }
    //Updating case 
    if(e.target.parentElement.className === 'check'){
        toggleStatusTaskWith(e.target.parentElement.parentElement.getAttribute("data-id"));       
     } 
    // if(e.target.classList.contains("fas") || e.target.classList.contains("checkedSpan") || e.target.classList.contains("unCheckedSpan")){
    //    toggleStatusTaskWith(e.target.parentElement.parentElement.getAttribute("data-id"));       
    // }

});

function toggleStatusTaskWith(taskId){
    for(let i=0; i < arrayOfTasks.length ;i++){
        if(arrayOfTasks[i].id == taskId){
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
    addElementsToPageFrom(arrayOfTasks);
}


function addTaskToArray(valeur){
    let task = {
        id : Date.now(),
        completed : false,
        title : valeur,
    }
    //Push task to array
    arrayOfTasks.push(task);
    //Add task to page
    //console.log(arrayOfTasks);
    addElementsToPageFrom(arrayOfTasks);
    //Add task to localStorage
    addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks){    
    tasksDiv.innerHTML = '';
    arrayOfTasks.forEach((e) => {
        let div1 = document.createElement("div");
        let div2 = document.createElement("div");
        let icon = document.createElement("i");
        let span1 = document.createElement("span");
        let span2 = document.createElement("span");

        div1.className = "task";
        div1.setAttribute("data-id", e.id);
        div2.className = "check";
        icon.className = "fas fa-check-circle unCheckedIcon";
        span1.className = "unCheckedSpan";
        if(e.completed){
            icon.className = "fas fa-check-circle checkedIcon";
            span1.className = "checkedSpan";
        }
        span2.className = "del"

        span1.appendChild(document.createTextNode(e.title));
        span2.appendChild(document.createTextNode("x"));
        div2.appendChild(icon);
        div2.appendChild(span1);

        div1.appendChild(div2);  
        div1.appendChild(span2); 

        tasksDiv.appendChild(div1);
    });
}

function addDataToLocalStorageFrom(arrayOfTasks){
    window.localStorage.setItem("task",JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("task");
    if (data){
        arrayOfTasks = JSON.parse(data);
        addElementsToPageFrom(arrayOfTasks);
    }
}

function deleteTaskWith(taskId){
    arrayOfTasks = arrayOfTasks.filter((e) =>{
        return e.id != taskId;
    })
    addDataToLocalStorageFrom(arrayOfTasks);

}

