// client.js

// Function to fetch tasks from the server
function fetchTasks() {
  fetch('/tasks')
    .then(response => response.json())
    .then(tasks => {
      // Update the UI with the fetched tasks
      // Example: Display the tasks in a list
      const taskList = document.getElementById('task-list');
      taskList.innerHTML = '';
      tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = task.title;
        taskList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Failed to fetch tasks:', error);
    });
}

// Function to create a new task
function createTask(title) {
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title })
  })
    .then(response => response.json())
    .then(task => {
      // Update the UI with the created task
      // Example: Add the task to the task list
      const taskList = document.getElementById('task-list');
      const listItem = document.createElement('li');
      listItem.textContent = task.title;
      taskList.appendChild(listItem);
    })
    .catch(error => {
      console.error('Failed to create task:', error);
    });
}

