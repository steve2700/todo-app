// Retrieve saved todos from local storage
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

// DOM elements
const form = document.getElementById("form");
const input = document.getElementById("input");
const priorityInput = document.getElementById("priorityInput");
const dueDateInput = document.getElementById("dueDateInput");
const addButton = document.getElementById("addButton");
const filterSelect = document.getElementById("filterSelect");
const todosList = document.getElementById("todos");

// Initialize todos array
let todos = savedTodos;

// Function to save todos to local storage
const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
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
  const todoDueDate = dueDateInput.value;
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

// Function to toggle a todo's completion status
const toggleComplete = (id) => {
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

// Function to clear all todos
const clearTodos = () => {
  todos = [];
  saveTodos();
  renderTodos();
};

// Function to render todos
const renderTodos = () => {
  todosList.innerHTML = "";
  const filteredTodos = filterTodos();
  filteredTodos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo");
    if (todo.completed) {
      todoItem.classList.add("completed");
    }
    todoItem.innerHTML = `
      <div class="todo-item">
        <input type="checkbox" class="checkbox" ${todo.completed ? "checked" : ""}>
        <div class="todo-text">${todo.text}</div>
        <div class="todo-priority">${todo.priority}</div>
        <div class="todo-due-date">${todo.dueDate}</div>
        <div class="actions">
          <button class="delete-button">Delete</button>
        </div>
      </div>
    `;
    const checkbox = todoItem.querySelector(".checkbox");
    const deleteButton = todoItem.querySelector(".delete-button");
    checkbox.addEventListener("change", () => toggleComplete(todo.id));
    deleteButton.addEventListener("click", () => deleteTodo(todo.id));
    todosList.appendChild(todoItem);
  });
};

// Function to filter todos based on the selected filter
const filterTodos = () => {
  const selectedFilter = filterSelect.value;
  switch (selectedFilter) {
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

// Initial rendering of todos
renderTodos();

