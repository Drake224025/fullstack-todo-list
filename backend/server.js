const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = 3000; // Define port number

// Connect to the SQLite database (creates it if it doesn't exist)
const db = new sqlite3.Database("./todo.db", (err) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  console.log("Connected to the TODO database.");

  // Create the tasks table if it doesn't exist (schema definition)
  db.run(
    "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed BOOLEAN DEFAULT FALSE)"
  );
});

// Enable parsing JSON in the request bodies
app.use(express.json());
// Apply the CORS middleware
app.use(cors());

// API Endpoints
// GET /tasks - Fetch all tasks
app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// POST /tasks - Create a new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).send({ error: "Title is required" });
  }

  db.run("INSERT INTO tasks (title) VALUES (?)", [title], (err) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(201).send({ message: "Task created" });
    }
  });
});

// PUT /tasks/:id - Update a task
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  // Simple validation
  if (!title || completed === undefined) {
    return res
      .status(400)
      .send({ error: "Valid title and completed status are required" });
  }

  db.run(
    "UPDATE tasks SET title = ?, completed = ? WHERE id = ?",
    [title, completed, id],
    (err) => {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        res.send({ message: "Task updated" });
      }
    }
  );
});

// DELETE /tasks/:id - Delete a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM tasks WHERE id = ?", [id], (err) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.send({ message: "Task deleted" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
