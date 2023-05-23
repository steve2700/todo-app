const form = document.getElementById("form");
const input = document.getElementById("input");
const priorityInput = document.getElementById("priorityInput");
const dueDateInput = document.getElementById("dueDateInput");
const todosUL = document.getElementById("todos");
const clearButton = document.getElementById("clearButton");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
});

clearButton.addEventListener("click", () => {
    todos = [];
    saveTodosToLocalStorage();
    renderTodos();
});

function addTodo() {
    const todoText = input.value.trim();
    const priority = priorityInput.value.trim();
    const dueDate = dueDateInput.value.trim();

    if (todoText) {
        const duplicateTodo = todos.find((todo) =>
            todo.text.toLowerCase() === todoText.toLowerCase()
        );

        if (duplicateTodo) {
            alert("This task already exists!");
            return;
        }

        const todo = {
            text: todoText,
            priority: priority || "N/A",
            dueDate: dueDate || "N/A",
            completed: false,
        };

        todos.push(todo);

        saveTodosToLocalStorage();
        renderTodos();

        input.value = "";
        priorityInput.value = "";
        dueDateInput.value = "";
    }
}

function renderTodos() {
    todosUL.innerHTML = "";

    todos.forEach((todo, index) => {
        const todoEl = document.createElement("li");
        const todoText = document.createElement("span");
        const priorityText = document.createElement("span");
        const dueDateText = document.createElement("span");
        const editButton = document.createElement("button");

        todoText.textContent = todo.text;
        priorityText.textContent = `Priority: ${todo.priority}`;
        dueDateText.textContent = `Due Date: ${todo.dueDate}`;
        editButton.textContent = "Edit";

        todoEl.appendChild(todoText);
        todoEl.appendChild(priorityText);
        todoEl.appendChild(dueDateText);
        todoEl.appendChild(editButton);

        if (todo.completed) {
            todoEl.classList.add("completed");
        }

        todoText.addEventListener("click", () => {
            toggleTodoComplete(index);
        });

        todoText.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            deleteTodo(index);
        });

        editButton.addEventListener("click", () => {
            editTodoText(index);
        });

        todosUL.appendChild(todoEl);
    });
}

function toggleTodoComplete(index) {
    todos[index].completed = !todos[index].completed;
    saveTodosToLocalStorage();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodosToLocalStorage();
    renderTodos();
}

function editTodoText(index) {
    const newTodoText = prompt("Enter the new todo text:");
    if (newTodoText) {
        todos[index].text = newTodoText.trim();
        saveTodosToLocalStorage();
        renderTodos();
    }
}

function saveTodosToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

renderTodos();

