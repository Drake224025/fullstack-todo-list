import { useEffect, useState } from "react";
import { ToDoProvider } from "./contexts";
import { ToDoForm, ToDoItem } from "./components/";

function App() {
  // State to hold the todos
  const [toDos, setToDos] = useState([]);

  // Function to fetch todos from the server
  const fetchToDos = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      setToDos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Fetch todos on component mount
  useEffect(() => {
    fetchToDos();
  }, []);

  // Function to add a new todo
  const addToDo = async (todo) => {
    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      if (!response.ok) {
        throw new Error("Failed to add todo");
      }
      await fetchToDos(); // Refresh todos after adding
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Function to delete a todo
  const deleteToDo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
      await fetchToDos(); // Refresh todos after deleting
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Function to update a todo
  const updateToDo = async (id, todo) => {
    try {
      console.log({ todo });
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
      await fetchToDos(); // Refresh todos after updating
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Function to toggle the completion status of a todo
  const toggleComplete = async (id) => {
    const todoToUpdate = toDos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
    await updateToDo(id, updatedTodo); // Update todo with new status
  };

  return (
    <ToDoProvider
      value={{ toDos, addToDo, deleteToDo, updateToDo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        {" "}
        {/* Main container with background color and padding */}
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          {" "}
          {/* Styled container for content */}
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your ToDos
          </h1>
          <div className="mb-4">
            {/* Todo form component */}
            <ToDoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/* Looping through todos and rendering ToDoItem components */}
            {toDos.map((todo) => (
              <div key={todo.id} className="w-full">
                <ToDoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToDoProvider>
  );
}

export default App;
