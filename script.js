let todos = [];

const form = document.getElementById("form");
const input = document.getElementById("input");
const priorityInput = document.getElementById("priorityInput");
const dueDateInput = document.getElementById("dueDateInput");
const todosList = document.getElementById("todos");
const filterSelect = document.getElementById("filterSelect");
const clearButton = document.getElementById("clearButton");
const profilePicture = document.getElementById("profilePicture");
const username = document.getElementById("username");

// Load profile and todos from local storage
loadData();

// Render profile and todos
renderProfile();
renderTodos();

// Event listener for form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();
  addTodo();
});

// Event listener for filter select
filterSelect.addEventListener("change", function () {
  renderTodos();
});

// Event listener for clear button
clearButton.addEventListener("click", function () {
  clearTodos();
});

// Event listener for profile picture edit
const editProfileButton = document.getElementById("editProfileButton");
editProfileButton.addEventListener("click", function () {
  const newProfilePicture = prompt("Enter the URL of your new profile picture:");
  if (newProfilePicture) {
    updateProfilePicture(newProfilePicture);
  }
});

// Function to add a new todo
function addTodo() {
  const todoText = input.value.trim();
  const priority = priorityInput.value.trim();
  const dueDate = dueDateInput.value;

  if (todoText !== "") {
    const todo = {
      id: new Date().getTime(),
      text: todoText,
      priority: priority,
      dueDate: dueDate,
      completed: false,
   };

    todos.push(todo);
    saveData();
    renderTodos();

    input.value = "";
    priorityInput.value = "";
    dueDateInput.value = "";
    input.focus();
  }
}

// Function to render profile
function renderProfile() {
  const storedProfilePicture = localStorage.getItem("profilePicture");
  const storedUsername = localStorage.getItem("username");

  if (storedProfilePicture) {
    profilePicture.style.backgroundImage = `url('${storedProfilePicture}')`;
  }

  if (storedUsername) {
    username.textContent = storedUsername;
  }
}

// Function to update profile picture
function updateProfilePicture(newProfilePicture) {
  profilePicture.style.backgroundImage = `url('${newProfilePicture}')`;
  localStorage.setItem("profilePicture", newProfilePicture);
}

// Function to save todos to local storage
function saveData() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to load todos from local storage
function loadData() {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
  }
}

// Function to render todos
function renderTodos() {
  todosList.innerHTML = "";

  const filteredTodos = filterSelect.value === "all"
    ? todos
    : filterSelect.value === "completed"
      ? todos.filter(todo => todo.completed)
      : todos.filter(todo => !todo.completed);

  filteredTodos.forEach(todo => {
    const todoElement = document.createElement("li");
    todoElement.classList.add("todo");
    if (todo.completed) {
      todoElement.classList.add("complete");
    }

    todoElement.innerHTML = `
      <span>${todo.text} - Priority: ${todo.priority} - Due Date: ${todo.dueDate}</span>
      <div class="todo-actions">
        <button class="delete-button" onclick="deleteTodo(${todo.id})">&#10006;</button>
      </div>
    `;

    todoElement.addEventListener("click", function () {
      toggleTodoComplete(todo.id);
    });

    todoElement.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      deleteTodo(todo.id);
    });

    todosList.appendChild(todoElement);
  });
}

// Function to toggle todo completion status
function toggleTodoComplete(todoId) {
  todos = todos.map(todo => {
    if (todo.id === todoId) {
      return {
        ...todo,
        completed: !todo.completed
      };
    }
    return todo;
  });

  saveData();
  renderTodos();
}

// Function to delete a todo
function deleteTodo(todoId) {
  todos = todos.filter(todo => todo.id !== todoId);
  saveData();
  renderTodos();
}

// Function to clear all todos
function clearTodos() {
  todos = [];
  saveData();
  renderTodos();
}

