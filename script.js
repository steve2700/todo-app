const form = document.getElementById("form");
const input = document.getElementById("input");
const priorityInput = document.getElementById("priorityInput");
const todosUL = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos")) || [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
});

renderTodos();

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

function saveTodosToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

