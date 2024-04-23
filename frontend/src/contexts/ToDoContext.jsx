/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Import necessary functions and hooks from React
import { createContext, useContext, useEffect, useState } from "react";

// Create a context for managing todo items
export const ToDoContext = createContext({
  toDos: [],
  addToDo: (todo) => {},
  deleteToDo: (id) => {},
  updateToDo: (id, todo) => {},
  toggleComplete: (id) => {},
});

// Custom hook to access the ToDoContext
export const useTodo = () => {
  return useContext(ToDoContext);
};

// Provider component to manage the state of todo items
export const ToDoProvider = ({ children }) => {
  // State to hold the list of todos
  const [toDos, setToDos] = useState([]);

  // Fetch todos from the server on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:3000/tasks");
      const data = await response.json();
      setToDos(data);
    };
    fetchTasks();
  }, []);

  // Add a new todo item to the list
  const addToDo = async (todo) => {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: todo.toDo }),
    });
    const newTask = await response.json();
    setToDos((prev) => [...prev, newTask]);
  };

  // Delete a todo item from the list
  const deleteToDo = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    });
    setToDos((prev) => prev.filter((item) => item.id !== id));
  };

  // Update a todo item in the list
  const updateToDo = async (id, todo) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    setToDos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  // Toggle the completion status of a todo item
  const toggleComplete = async (id) => {
    const updatedTodo = toDos.find((todo) => todo.id === id);
    updatedTodo.completed = !updatedTodo.completed;

    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo),
    });

    setToDos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? updatedTodo : prevTodo))
    );
  };

  // Provide the ToDoContext with the necessary values
  return (
    <ToDoContext.Provider
      value={{ toDos, addToDo, deleteToDo, updateToDo, toggleComplete }}
    >
      {children}
    </ToDoContext.Provider>
  );
};
