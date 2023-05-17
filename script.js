// Assuming you have a form with an input field for the task title
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const title = form.elements.title.value;
  
  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  })
    .then((response) => response.json())
    .then((task) => {
      // Handle the response or update the UI
      console.log('New task created:', task);
    })
    .catch((error) => {
      // Handle the error
      console.error('Error creating task:', error);
    });
});

