// task format: {id: string, name: string, completed: boolean, owner: string}
let tasks;
let owner;
// Functions
function generateRandomId() {
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 9);
}

function resetFilterStatus() {
    document.getElementById("filter__task-status").value = "all";
}

function renderTasks(tasks) {
    const taskList = document.getElementById("list__tasks");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        if (task.owner !== owner) {
            return;
        }
        const taskElement = document.createElement("div");
        taskElement.id = "task__element";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function () {
            toggleStatus(task.id);
        });
        const label = document.createElement("label");
        label.innerText = task.name;
        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.id = "button__edit-task";
        editButton.addEventListener('click', function (){
            editTask(task.id);
        });
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.id = "button__delete-task";
        deleteButton.addEventListener('click', function (){
            deleteTask(task.id);
        });
        taskElement.appendChild(checkbox);
        taskElement.appendChild(label);
        taskElement.appendChild(editButton);
        taskElement.appendChild(deleteButton);
        taskList.appendChild(taskElement);
    });
}

function addTasks() {
    const task = document.getElementById("input__task").value;
    if (task === "") {
        alert("Task cannot be empty");
        return;
    }
    tasks.unshift({id: generateRandomId(), name: task, completed : false, owner: owner});
    localStorage.setItem(`tasks_${owner}`, JSON.stringify(tasks));
    document.getElementById("input__task").value = "";
    renderTasks(tasks);
    resetFilterStatus();
}

function cancelTasks() {
    document.getElementById("input__task").value = "";
}

function editTask(id) {
    const task = tasks.find(task => task.id === id && task.owner === owner);
    const newTaskName = prompt("Edit task", task.name);
    if (newTaskName === null || newTaskName === "") {
        alert("Task cannot be empty");
        return;
    }
    tasks = tasks.filter((task) => {
        if (task.id === id) {
            task.name = newTaskName;
        }
        return task;
    });
    localStorage.setItem(`tasks_${owner}`, JSON.stringify(tasks));
    renderTasks(tasks);
    resetFilterStatus();
}

function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id && task.owner === owner);
    localStorage.setItem(`tasks_${owner}`, JSON.stringify(tasks));
    renderTasks(tasks);
    resetFilterStatus();
}

function toggleStatus(id) {
    tasks = tasks.map((task) => {
        if (task.id === id && task.owner === owner) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem(`tasks_${owner}`, JSON.stringify(tasks));
    renderTasks(tasks);
    resetFilterStatus();
}

function filterTasks() {
    const filterStatus = document.getElementById("filter__task-status").value;
    if (filterStatus === "all") {
        renderTasks(tasks);
        return;
    };
    let filterTaskList = tasks.filter((task) => {
        if (task.owner === JSON.parse(localStorage.getItem('loggedInUser')).username) {
            if (filterStatus === "done") {
                return task.completed;
            }
            else {
                return !task.completed;
            }
        }
    });
    renderTasks(filterTaskList);
}
function logOut() {
    localStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('loggedInUser');
    window.location.href = "login.html";
}
// DOM

document.getElementById("button__add-task").addEventListener('click', () => {
    addTasks();
});

document.getElementById("button__cancel-task").addEventListener('click', () => {
    cancelTasks();
});

document.getElementById("filter__task-status").addEventListener('change', () => {
    filterTasks();
});

document.getElementById("button__log-out").addEventListener('click', () => {
    logOut();
});

window.addEventListener('load', function(event) {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem('loggedInUser')) || JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!user) {
        window.location.href = "login.html";
        return;
    }
    this.document.getElementById("greeting").innerText = `Hello, ${user.username}!`;
    owner = user.username;
    if (localStorage.getItem(`tasks_${owner}`)) {
        tasks = JSON.parse(localStorage.getItem(`tasks_${owner}`));
    }
    else {
        tasks = [];
    }
    renderTasks(tasks);
});