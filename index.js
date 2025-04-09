// Load tasks from local storage when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    updateTaskCount();
});

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");
    let prioritySelect = document.getElementById("prioritySelect");
    let dueDate = document.getElementById("dueDate");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");
    li.className = prioritySelect.value;
    
    let dueDateText = "";
    if (dueDate.value) {
        let formattedDate = new Date(dueDate.value).toLocaleDateString();
        dueDateText = `<span class="task-due"><i class="far fa-calendar-alt"></i> ${formattedDate}</span>`;
    }

    li.innerHTML = `
        <input type="checkbox" class="task-checkbox" onchange="toggleTask(this)">
        <span class="task-text">${taskInput.value}</span>
        ${dueDateText}
        <button class="delete-btn" onclick="deleteTask(this)"><i class="fas fa-times"></i></button>
    `;

    taskList.appendChild(li);
    taskInput.value = "";
    dueDate.value = "";
    saveTasks();
    updateTaskCount();
}

function deleteTask(button) {
    if (confirm("Are you sure you want to delete this task?")) {
        button.parentElement.remove();
        saveTasks();
        updateTaskCount();
    }
}

function toggleTask(checkbox) {
    let taskItem = checkbox.parentElement;
    taskItem.classList.toggle("completed");
    saveTasks();
    updateTaskCount();
}

function filterTasks(filter) {
    let tasks = document.querySelectorAll("#taskList li");
    let filterButtons = document.querySelectorAll(".filter-container button");
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
    
    tasks.forEach(task => {
        switch(filter) {
            case 'all':
                task.style.display = "flex";
                break;
            case 'active':
                task.style.display = task.classList.contains("completed") ? "none" : "flex";
                break;
            case 'completed':
                task.style.display = task.classList.contains("completed") ? "flex" : "none";
                break;
        }
    });
}

// Load tasks from local storage when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    updateTaskCount();
});

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");
    let prioritySelect = document.getElementById("prioritySelect");
    let dueDate = document.getElementById("dueDate");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");
    li.className = prioritySelect.value;
    
    let dueDateText = "";
    if (dueDate.value) {
        let formattedDate = new Date(dueDate.value).toLocaleDateString();
        dueDateText = `<span class="task-due"><i class="far fa-calendar-alt"></i> ${formattedDate}</span>`;
    }

    li.innerHTML = `
        <input type="checkbox" class="task-checkbox" onchange="toggleTask(this)">
        <span class="task-text">${taskInput.value}</span>
        ${dueDateText}
        <button class="delete-btn" onclick="deleteTask(this)"><i class="fas fa-times"></i></button>
    `;

    taskList.appendChild(li);
    taskInput.value = "";
    dueDate.value = "";
    saveTasks();
    updateTaskCount();
}

function deleteTask(button) {
    if (confirm("Are you sure you want to delete this task?")) {
        button.parentElement.remove();
        saveTasks();
        updateTaskCount();
    }
}

function toggleTask(checkbox) {
    let taskItem = checkbox.parentElement;
    taskItem.classList.toggle("completed");
    saveTasks();
    updateTaskCount();
}

function filterTasks(filter) {
    let tasks = document.querySelectorAll("#taskList li");
    let filterButtons = document.querySelectorAll(".filter-container button");
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
    
    tasks.forEach(task => {
        switch(filter) {
            case 'all':
                task.style.display = "flex";
                break;
            case 'active':
                task.style.display = task.classList.contains("completed") ? "none" : "flex";
                break;
            case 'completed':
                task.style.display = task.classList.contains("completed") ? "flex" : "none";
                break;
        }
    });
}

function clearCompleted() {
    if (confirm("Are you sure you want to clear all completed tasks?")) {
        let completedTasks = document.querySelectorAll("#taskList li.completed");
        completedTasks.forEach(task => task.remove());
        saveTasks();
        updateTaskCount();
    }
}

function updateTaskCount() {
    let activeTasks = document.querySelectorAll("#taskList li:not(.completed)");
    document.getElementById("count").textContent = activeTasks.length;
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(task => {
        tasks.push({
            text: task.querySelector(".task-text").textContent,
            completed: task.classList.contains("completed"),
            priority: task.classList.contains("low") ? "low" : 
                     task.classList.contains("medium") ? "medium" : "high",
            dueDate: task.querySelector(".task-due")?.textContent.trim() || ""
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    
    savedTasks.forEach(task => {
        let li = document.createElement("li");
        li.className = task.priority;
        if (task.completed) li.classList.add("completed");
        
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" onchange="toggleTask(this)" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${task.text}</span>
            ${task.dueDate ? `<span class="task-due">${task.dueDate}</span>` : ''}
            <button class="delete-btn" onclick="deleteTask(this)"><i class="fas fa-times"></i></button>
        `;
        
        taskList.appendChild(li);
    });
}

function updateTaskCount() {
    let activeTasks = document.querySelectorAll("#taskList li:not(.completed)");
    document.getElementById("count").textContent = activeTasks.length;
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(task => {
        tasks.push({
            text: task.querySelector(".task-text").textContent,
            completed: task.classList.contains("completed"),
            priority: task.classList.contains("low") ? "low" : 
                     task.classList.contains("medium") ? "medium" : "high",
            dueDate: task.querySelector(".task-due")?.textContent.trim() || ""
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    
    savedTasks.forEach(task => {
        let li = document.createElement("li");
        li.className = task.priority;
        if (task.completed) li.classList.add("completed");
        
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" onchange="toggleTask(this)" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${task.text}</span>
            ${task.dueDate ? `<span class="task-due">${task.dueDate}</span>` : ''}
            <button class="delete-btn" onclick="deleteTask(this)"><i class="fas fa-times"></i></button>
        `;
        
        taskList.appendChild(li);
    });
}