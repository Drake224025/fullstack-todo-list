const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./todo.db");

db.serialize(() => {
  // Serialize ensures tasks are added sequentially
  db.run("DELETE FROM tasks"); // Optionally clear any existing tasks

  db.run("INSERT INTO tasks (title) VALUES ('Buy groceries')");
  db.run("INSERT INTO tasks (title) VALUES ('Complete assignment')");
  db.run("INSERT INTO tasks (title, completed) VALUES ('Walk the dog', TRUE)"); // Example of a completed task
});

console.log("Seed data added to the database");
