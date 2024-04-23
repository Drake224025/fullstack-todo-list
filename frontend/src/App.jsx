import { useEffect, useState } from "react";
import { ToDoProvider } from "./contexts"; // Importing the ToDoProvider from the contexts file
import { ToDoForm, ToDoItem } from "./components/"; // Importing ToDoForm and ToDoItem components

function App() {
  const [toDos, setToDos] = useState([]); // State to manage the list of todos

  // Function to add a new todo
  const addToDo = (todo) => {
    setToDos((prev) => [{ id: Date.now(), ...todo }, ...prev]); // Adding a new todo to the list
  };

  // Function to delete a todo by ID
  const deleteToDo = (id) => {
    setToDos((prev) => prev.filter((item) => item.id !== id)); // Deleting a todo from the list
  };

  // Function to update a todo by ID
  const updateToDo = (id, todo) => {
    setToDos(
      (prev) =>
        prev.map((prevTodo) => (prevTodo.id === todo.id ? todo : prevTodo)) // Updating a todo in the list
    );
  };

  // Function to toggle the completion status of a todo by ID
  const toggleComplete = (id) => {
    setToDos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed } // Toggling completion status
          : prevTodo
      )
    );
  };

  // useEffect to load todos from database on component mount
  useEffect(() => {
    const fetchTodo = async () => {
      const response = await fetch("http://localhost:3000/tasks");
      const toDos = await response.json();
      setToDos(toDos);
    };
    fetchTodo();
  }, []);

  return (
    <ToDoProvider
      value={{ toDos, addToDo, deleteToDo, updateToDo, toggleComplete }} // Providing context values to child components
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

export default App; // Exporting the App component as default
