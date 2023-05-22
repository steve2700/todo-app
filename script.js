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
    let priority = document.getElementById("priorityInput").value;

    if (todoText) {
        const todoEl = document.createElement("li");
        todoEl.innerText = todoText;

        const priorityEl = document.createElement("span");
        priorityEl.classList.add("priority");
        priorityEl.innerText = priority;
        todoEl.appendChild(priorityEl);

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
        document.getElementById("priorityInput").value = "";

        updateLS();
    }
}

function updateLS() {
    const todosEl = document.querySelectorAll("li");

    const todos = [];

    todosEl.forEach((todoEl) => {
        const todoText = todoEl.innerText;
        const priority = todoEl.querySelector(".priority").innerText;
        const completed = todoEl.classList.contains("completed");

        todos.push({
            text: todoText,
            priority: priority,
            completed: completed,
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
            todo.style.display = "block";
        } else if (selectedValue === "completed") {
            if (todo.classList.contains("completed")) {
                todo.style.display = "block";
            } else {
                todo.style.display = "none";
            }
        } else if (selectedValue === "not-completed") {
            if (!todo.classList.contains("completed")) {
                todo.style.display = "block";
            } else {
                todo.style.display = "none";
            }
        }
    });
}

addTodo();
updateLS();
filterTodos();

const todosUL = document.getElementById("todos");

todosUL.addEventListener("dblclick", handleTodoEdit);

function handleTodoEdit(event) {
    const todoItem = event.target.closest("li");
    const todoTextElement = todoItem.querySelector(".todo-text");

    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.value = todoTextElement.textContent;

    inputElement.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            finishEditingTodoItem(todoItem, inputElement);
        }
    });

    todoItem.replaceChild(inputElement, todoTextElement);

    inputElement.focus();
}

function finishEditingTodoItem(todoItem, inputElement) {
    const newTodoText = inputElement.value;

    const todoTextElement = document.createElement("span");
    todoTextElement.classList.add("todo-text");
    todoTextElement.textContent = newTodoText;

    todoItem.replaceChild(todoTextElement, inputElement);
}


~

