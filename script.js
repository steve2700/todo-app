const form = document.getElementById("form");
const input = document.getElementById("input");
const priorityInput = document.getElementById("priorityInput");
const todosUL = document.getElementById("todos");
const usernameSpan = document.querySelector(".username");
const statusSpan = document.querySelector(".status");

// User profile details
let userProfile = {
    username: "John Doe",
    status: "Online"
};

// Update user profile details
function updateUserProfile() {
    usernameSpan.textContent = userProfile.username;
    statusSpan.textContent = userProfile.status;
}

// Update user status
function updateUserStatus(newStatus) {
    userProfile.status = newStatus;
    updateUserProfile();
}

// Event listener for form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
});

// Function to add a new todo
function addTodo() {
    const todoText = input.value.trim();
    const priority = priorityInput.value.trim();

    if (todoText) {
        const duplicateTodo = todos.find(
            (todo) => todo.text.toLowerCase() === todoText.toLowerCase()
        );

        if (duplicateTodo) {
            alert("This task already exists!");
            return;
        }

        const todo = {
            text: todoText,
            priority: priority || "N/A",
            completed: false,
        };

        todos.push(todo);

        saveTodosToLocalStorage();
        renderTodos();

        input.value = "";
        priorityInput.value = "";
    }
}

// Function to render the todos
function renderTodos() {
    todosUL.innerHTML = "";

    todos.forEach((todo, index) => {
        const todoEl = document.createElement("li");
        todoEl.innerHTML = `
            <span class="todo-text">${todo.text}</span>
            <span class="priority">Priority: ${todo.priority}</span>
            <button class="edit-button">Edit</button>
        `;

        if (todo.completed) {
            todoEl.classList.add("completed");
        }

        todoEl.addEventListener("click", () => {
            todo.completed = !todo.completed;
            saveTodosToLocalStorage();
            renderTodos();
        });

        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            todos.splice(index, 1);
            saveTodosToLocalStorage();
            renderTodos();
        });

        todosUL.appendChild(todoEl);
    });
}

// Function to save todos to local storage
function saveTodosToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Initialize user profile details
updateUserProfile();

// Example usage: Update user status
setTimeout(() => {
    updateUserStatus("Offline");
}, 5000);

