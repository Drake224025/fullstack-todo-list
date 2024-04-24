const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./todo.db");

db.serialize(() => {
  // Serialize ensures tasks are added sequentially
  db.run("DELETE FROM tasks"); // Optionally clear any existing tasks

  db.run("INSERT INTO tasks (title) VALUES ('Got milk?')");
  db.run("INSERT INTO tasks (title) VALUES ('Squash bugs')");
  db.run(
    "INSERT INTO tasks (title, completed) VALUES ('Take a chill pill', TRUE)"
  ); // Example of a completed task
  db.run("INSERT INTO tasks (title) VALUES ('Zzz')");
  db.run("INSERT INTO tasks (title) VALUES ('Java Jolt')");
  db.run("INSERT INTO tasks (title) VALUES ('Ninja code')");
  db.run("INSERT INTO tasks (title) VALUES ('Code, eat, sleep')");
});

console.log("Seed data added to the database");
