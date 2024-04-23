/* eslint-disable no-unused-vars */
import { createContext, useContext } from "react";

export const ToDoContext = createContext({
  toDos: [
    {
      id: 1,
      todo: "message",
      completed: false,
    },
  ],
  addToDo: (todo) => {},
  deleteToDo: (id) => {},
  updateToDo: (id, todo) => {},
  toggleComplete: (id) => {},
});

export const useTodo = () => {
  return useContext(ToDoContext);
};

export const ToDoProvider = ToDoContext.Provider;
