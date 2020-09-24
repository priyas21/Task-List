// Define UI vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('ul');
const clearButton = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const deletTaskIcon = document.querySelector('.delete-item');


//Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);
  //Add Task event
  form.addEventListener("submit", addTask);
  //Remove task event
  taskList.addEventListener("click", removeTask);
  //Clear all tasks
  clearButton.addEventListener("click", clearTasks);
  //Filter task event
  filter.addEventListener('keyup', filterTask);
}

function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks' === null)) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task){
    //create a list item
    const li = document.createElement('li');
    //add a css class
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    // create new link element
    const link = document.createElement('a');
    //add class
    link.className = "delete-item secondary-content";
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    //append the link to li
    li.appendChild(link);
    console.log(li);
    //Append li to ul
    taskList.appendChild(li);
  })
}

function addTask(e){
  if(taskInput.value === '') {
    alert("Add a task");
  }

  //create a list item
  const li = document.createElement('li');
  //add a css class
  li.className = 'collection-item';
  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // create new link element
  const link = document.createElement('a');
  //add class
  link.className = "delete-item secondary-content";
  //add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>'
  //append the link to li
  li.appendChild(link);
  console.log(li);
  //Append li to ul
  taskList.appendChild(li);
  // Store in local storgae
  storeTaskInLocalStorage(taskInput.value);
  //Clear input
  taskInput.value = '';

  e.preventDefault();
}

function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      //Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks(e) {
  if(confirm("Are you sure?")) {
    while(taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }

  clearTaskFromLocalStorage();
}

function clearTaskFromLocalStorage() {
  localStorage.clear();
}

function filterTask(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

//StoreTask
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// NOTES
// Query selector return node list on which we can iterate using forEach
// document.getElementById return html class which needs to be converted into Array to use forEach