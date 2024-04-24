/* eslint-disable no-unused-vars */
import { createContext, useContext } from "react";

// Create a context for managing ToDo items
export const ToDoContext = createContext({
  // Initial state with a single ToDo item
  toDos: [
    {
      id: 1,
      todo: "message",
      completed: false,
    },
  ],

  // Placeholder functions for managing ToDo items
  addToDo: (todo) => {}, // Add a new ToDo
  deleteToDo: (id) => {}, // Delete a ToDo by ID
  updateToDo: (id, todo) => {}, // Update a ToDo by ID
  toggleComplete: (id) => {}, // Toggle completion status of a ToDo
});

// Custom hook to access ToDoContext values
export const useTodo = () => {
  return useContext(ToDoContext);
};

// Export the ToDoProvider component for providing ToDoContext values
export const ToDoProvider = ToDoContext.Provider;
