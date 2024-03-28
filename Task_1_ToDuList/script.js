document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
  
    function addTask() {
      const taskText = taskInput.value.trim();
  
      if (taskText === "") {
        alert("Please enter a task.");
        return;
      }
  
      const li = document.createElement("li");
      li.textContent = taskText;
      li.classList.add("task-item");
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.onclick = function() {
        li.remove();
      };
  
      const prioritySelect = document.createElement("select");
      prioritySelect.innerHTML = `
        <option value="high">High P</option>
        <option value="medium">Medium P</option>
        <option value="low">Low P</option>
        <option value="completed">Completed</option>
      `;
      prioritySelect.classList.add("priority-select");
      prioritySelect.addEventListener("change", function() {
        const priority = this.value;
        if(priority==="completed"){
          
                li.classList.toggle("completed");
           
        }
        li.classList.remove("priority-high", "priority-medium", "priority-low","priority-completed");
        li.classList.add(`priority-${priority}`);
      });
    li.classList.add('priority-high');
      li.appendChild(prioritySelect);
      li.appendChild(deleteBtn);
     
  
      taskList.appendChild(li);
      taskInput.value = "";
    }
  
    addTaskBtn.addEventListener("click", addTask);
  
    taskInput.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        addTask();
      }
    });
  });
  