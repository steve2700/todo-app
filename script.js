const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach((todo) => {
        addTodo(todo);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTodo();
});

function addTodo() {
    let todoText = input.value;

    if (todoText) {
        const todoEl = document.createElement("li");
        todoEl.innerText = todoText;

        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed");
            updateLS();
        });

        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            todoEl.remove();
            updateLS();
        });

        todosUL.appendChild(todoEl);

        input.value = "";

        updateLS();
    }
}

function updateLS() {
    const todosEl = document.querySelectorAll("li");
    const todos = [];

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clearLocalStorage);

function clearLocalStorage() {
    localStorage.removeItem("todos");
    todosUL.innerHTML = "";
}

const filterSelect = document.getElementById("filterSelect");
filterSelect.addEventListener("change", filterTodos);

function filterTodos() {
    const selectedValue = filterSelect.value;
    const todos = document.querySelectorAll("li");

    todos.forEach((todo) => {
        if (selectedValue === "all") {
            // Show all todos
            todo.style.display = "block";
        } else if (selectedValue === "completed") {
            // Show only completed todos
            if (todo.classList.contains("completed")) {
                todo.style.display = "block";
            } else {
                todo.style.display = "none";
            }
        } else if (selectedValue === "not-completed") {
            // Show only not completed todos
            if (!todo.classList.contains("completed")) {
                todo.style.display = "block";
            } else {
                todo.style.display = "none";
            }
        }
    });
}

