import Task from "./Task.js";

// UI Elements
const formUI = document.getElementById("form");
const inputUI = document.getElementById("input");
const tasksUI = document.getElementById("tasks");

// Task List
let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Initialize or Load the Tasks
updateTasks(); // Load the saved tasks (if any)

// Add Task
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent URL Params and Refreshing

  // Check that the input field is not blank
  if (!inputUI.value) {
    alert("Error: Input Field is Blank");
    return;
  }

  tasks.push(new Task(inputUI.value)); // Add Task
  updateTasks(); // Update the UI
});

/**
 * Updates the UI
 */
function updateTasks() {
  tasksUI.innerHTML = ""; // Reset the UI

  // Loop over tasks
  tasks.forEach((task) => {
    // Create Task
    const newTask = document.createElement("li");
    // Add Bootstrap Classes
    newTask.className =
      "list-group-item d-flex justify-content-between align-items-center px-2";

    // Add Content
    newTask.innerHTML = `
      <div class="ms-2 me-auto">${task.body}</div>
      <div class="btn btn-danger btn-sm"><i class="bi bi-x-lg"></i> Done</div>
    `;

    // Change Focused Items' UI
    if (task.focus) {
      newTask.classList.toggle("list-group-item-primary");
    }

    tasksUI.appendChild(newTask); // Add Task to UI
    formUI.reset(); // Reset form and clear input fields

    // Focusing on an Item
    newTask.addEventListener("click", (e) => {
      // Check that the newTask element is the target and not its children
      if (e.target === newTask) {
        task.focus = !task.focus; // Toggle the focus
        updateTasks(); // Update the UI
      }
    });

    // Removing an Item
    newTask.children[1].addEventListener("click", () => {
      let index = [].indexOf.call(tasksUI.children, newTask); // Get the index
      tasks.splice(index, 1); // Remove the Task
      updateTasks(); // Update the UI
    });
  });

  // Save to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
