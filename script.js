// Retrieve saved todos from local storage
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

// Retrieve saved profile from local storage
const savedProfile = JSON.parse(localStorage.getItem("profile")) || {};

// DOM elements
const form = document.getElementById("form");
const input = document.getElementById("input");
const priorityInput = document.getElementById("priorityInput");
const dueDateInput = document.getElementById("dueDateInput");
const addButton = document.getElementById("addButton");
const filterSelect = document.getElementById("filterSelect");
const todosList = document.getElementById("todos");
const clearButton = document.getElementById("clearButton");
const profilePicture = document.getElementById("profilePicture");
const profilePictureInput = document.getElementById("profilePictureInput");
const usernameInput = document.getElementById("usernameInput");
const saveProfileButton = document.getElementById("saveProfileButton");

// Initialize todos array
let todos = savedTodos;

// Initialize profile
let profile = savedProfile;

// Function to save todos to local storage
const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Function to save profile to local storage
const saveProfile = () => {
  localStorage.setItem("profile", JSON.stringify(profile));
};

// Function to create a new todo object
const createTodo = (text, priority, dueDate) => {
  return {
    text: text,
    priority: priority,
    dueDate: dueDate,
    completed: false,
    id: Date.now().toString(),
  };
};

// Function to add a new todo
const addTodo = (event) => {
  event.preventDefault();
  const todoText = input.value.trim();
  const todoPriority = priorityInput.value.trim();
  const todoDueDate = dueDateInputHere's the continuation of the JavaScript code:

```javascript
  .value;

  if (todoText !== "") {
    const newTodo = createTodo(todoText, todoPriority, todoDueDate);
    todos.push(newTodo);
    saveTodos();
    input.value = "";
    priorityInput.value = "";
    dueDateInput.value = "";
    renderTodos();
  }
};

// Function to clear all todos
const clearTodos = () => {
  todos = [];
  saveTodos();
  renderTodos();
};

// Function to toggle the completed status of a todo
const toggleTodo = (id) => {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
  saveTodos();
  renderTodos();
};

// Function to delete a todo
const deleteTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
};

// Function to render the todos
const renderTodos = () => {
  const filter = filterSelect.value;
  const filteredTodos = filterTodos(todos, filter);
  todosList.innerHTML = "";

  filteredTodos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.checked = todo.completed;
    todoCheckbox.addEventListener("change", () => toggleTodo(todo.id));
    todoItem.appendChild(todoCheckbox);

    const todoText = document.createElement("span");
    todoText.innerText = todo.text;
    todoText.classList.add(todo.completed ? "completed" : "");
    todoItem.appendChild(todoText);

    const todoPriority = document.createElement("span");
    todoPriority.innerText = todo.priority;
    todoItem.appendChild(todoPriority);

    const todoDueDate = document.createElement("span");
    todoDueDate.innerText = todo.dueDate;
    todoItem.appendChild(todoDueDate);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => deleteTodo(todo.id));
    todoItem.appendChild(deleteButton);

    todosList.appendChild(todoItem);
  });
};

// Function to filter todos based on the selected filter option
const filterTodos = (todos, filter) => {
  switch (filter) {
    case "completed":
      return todos.filter((todo) => todo.completed);
    case "not-completed":
      return todos.filter((todo) => !todo.completed);
    default:
      return todos;
  }
};

// Event listeners
form.addEventListener("submit", addTodo);
clearButton.addEventListener("click", clearTodos);
filterSelect.addEventListener("change", renderTodos);
profilePictureInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    profile.profilePicture = e.target.result;
    saveProfile();
    renderProfile();
  };
  reader.readAsDataURL(file);
});
usernameInput.addEventListener("input", () => {
  profile.username = usernameInput.value;
  saveProfile();
});
saveProfileButton.addEventListener("click", () => {
  profile.username = usernameInput.value;
  saveProfile();
  renderProfile();
});

// Function to render the profile picture and username
const renderProfile = () => {
  if (profile.profilePicture) {
    profilePicture.style.backgroundImage = `url(${profile.profilePicture})`;
  } else {
    profilePicture.style.backgroundImage = "none";
  }
  usernameInput.value = profile.username || "";
};

// Initial rendering of todos and profile
renderTodos();
renderProfile();

