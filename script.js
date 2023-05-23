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
    const priorityText = priorityInput.value.trim();
    const dueDateText = dueDateInput.value.trim();

    if (todoText === "") {
        return;
    }

    const todo = {
        id: Date.now(),
        text: todoText,
        priority: priorityText,
        dueDate: dueDateText,
        completed: false,
    };

    todoList.push(todo);

    displayTodoList();

    input.value = "";
    priorityInput.value = "";
    dueDateInput.value = "";
}

function displayTodoList() {
    todos.innerHTML = "";

    const filter = filterSelect.value;

    const filteredTodos = todoList.filter((todo) => {
        if (filter === "completed") {
            return todo.completed;
        } else if (filter === "not-completed") {
            return !todo.completed;
        } else {
            return true;
        }
    });

    filteredTodos.forEach((todo) => {
        const todoItem = document.createElement("li");
        todoItem.classList.add("todo-item");
        if (todo.completed) {
            todoItem.classList.add("completed");
        }

        const todoText = document.createElement("span");
        todoText.classList.add("todo-text");
        todoText.innerText = todo.text;

        const todoPriority = document.createElement("span");
        todoPriority.classList.add("todo-priority");
        todoPriority.innerText = todo.priority;

        const todoDueDate = document.createElement("span");
        todoDueDate.classList.add("todo-duedate");
        todoDueDate.innerText = todo.dueDate;

        const todoActions = document.createElement("div");
        todoActions.classList.add("todo-actions");

        const completeButton = document.createElement("button");
        completeButton.innerHTML = "&#10003;";
        completeButton.setAttribute("aria-label", "Complete");
        completeButton.addEventListener("click", () => completeTodoItem(todo.id));

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "&#128465;";
        deleteButton.setAttribute("aria-label", "Delete");
        deleteButton.addEventListener("click", () => deleteTodoItem(todo.id));

        todoActions.appendChild(completeButton);
        todoActions.appendChild(deleteButton);

        todoItem.appendChild(todoText);
        todoItem.appendChild(todoPriority);
        todoItem.appendChild(todoDueDate);
        todoItem.appendChild(todoActions);

        todos.appendChild(todoItem);
    });
}

function completeTodoItem(todoId) {
    const todoIndex = todoList.findIndex((todo) => todo.id === todoId);

    if (todoIndex !== -1) {
        todoList[todoIndex].completed = !todoList[todoIndex].completed;
        displayTodoList();
    }
}

function deleteTodoItem(todoId) {
    const todoIndex = todoList.findIndex((todo) => todo.id === todoId);

    if (todoIndex !== -1) {
        todoList.splice(todoIndex, 1);
        displayTodoList();
    }
}

function clearAll() {
    todoList = [];
    displayTodoList();
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

