const form = document.getElementById("form");
const input = document.getElementById("input");
const priorityInput = document.getElementById("priorityInput");
const dueDateInput = document.getElementById("dueDateInput");
const addButton = document.getElementById("addButton");
const todos = document.getElementById("todos");
const filterSelect = document.getElementById("filterSelect");
const clearButton = document.getElementById("clearButton");
const profilePictureInput = document.getElementById("profilePictureInput");
const usernameInput = document.getElementById("usernameInput");
const saveProfileButton = document.getElementById("saveProfileButton");
const profilePicture = document.getElementById("profilePicture");
const username = document.getElementById("username");

let todoList = [];

function addTodo(event) {
    event.preventDefault();

    const todoText = input.value.trim();
    const priority = priorityInput.value.trim();
    const dueDate = dueDateInput.value.trim();

    if (todoText === "") {
        return;
    }

    const todo = {
        id: Date.now(),
        text: todoText,
        priority: priority,
        dueDate: dueDate,
        completed: false,
    };

    todoList.push(todo);
    saveTodoList();

    input.value = "";
    priorityInput.value = "";
    dueDateInput.value = "";

    renderTodoList();
}

function toggleComplete(todoId) {
    const todo = todoList.find((todo) => todo.id === todoId);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodoList();
        renderTodoList();
    }
}

function deleteTodo(todoId) {
    const todoIndex = todoList.findIndex((todo) => todo.id === todoId);
    if (todoIndex > -1) {
        todoList.splice(todoIndex, 1);
        saveTodoList();
        renderTodoList();
    }
}

function clearAll() {
    todoList = [];
    saveTodoList();
    renderTodoList();
}

function saveTodoList() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function loadTodoList() {
    const storedTodoList = localStorage.getItem("todoList");
    if (storedTodoList) {
        todoList = JSON.parse(storedTodoList);
        renderTodoList();
    }
}

function renderTodoList() {
    todos.innerHTML = "";

    const filteredTodos = filterTodos();

    filteredTodos.forEach((todo) => {
        const todoItem = document.createElement("li");
        todoItem.classList.add("todo-item");
        if (todo.completed) {
            todoItem.classList.add("completed");
        }

        const todoText = document.createElement("span");
        todoText.classList.add("todo-text");
        todoText.innerText = todo.text;
        todoText.addEventListener("click", () => toggleComplete(todo.id));

        const todoActions = document.createElement("div");
        todoActions.classList.add("todo-actions");

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();
            deleteTodo(todo.id);
        });

        todoActions.appendChild(deleteButton);

        todoItem.appendChild(todoText);
        todoItem.appendChild(todoActions);

        todos.appendChild(todoItem);
    });
}

function filterTodos() {
    const filterValue = filterSelect.value;
    if (filterValue === "completed") {
        return todoList.filter((todo) => todo.completed);
    } else if (filterValue === "not-completed") {
        return todoList.filter((todo) => !todo.completed);
    } else {
        return todoList;
    }
}

function saveProfile(event) {
    event.preventDefault();

    const profilePictureFile = profilePictureInput.files[0];
    const usernameText = usernameInput.value.trim();

    if (profilePictureFile && usernameText !== "") {
        const reader = new FileReader();
        reader.onload = () => {
            profilePicture.style.backgroundImage = `url('${reader.result}')`;
        };
        reader.readAsDataURL(profilePictureFile);

        username.innerText = usernameText;
    }
}

form.addEventListener("submit", addTodo);
clearButton.addEventListener("click", clearAll);
saveProfileButton.addEventListener("click", saveProfile);

loadTodoList();

