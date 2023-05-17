const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo-app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
const taskSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', taskSchema);
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  const newTask = new Task({ title });

  newTask.save()
    .then((task) => {
      res.status(201).json(task);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to create a new task' });
    });
});
app.get('/tasks', (req, res) => {
  Task.find()
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to retrieve tasks' });
    });
});

