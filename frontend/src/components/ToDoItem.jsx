/* eslint-disable react/prop-types */
import { useState } from "react";
import { useTodo } from "../contexts"; // Importing the custom hook from the context file

function ToDoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false); // State to manage todo edit mode
  const [title, setTitle] = useState(todo.title); // State to hold todo message

  const { updateToDo, deleteToDo, toggleComplete } = useTodo(); // Using the custom hook to access context functions

  // Function to edit a todo
  const editTodo = () => {
    updateToDo(todo.id, { ...todo, title }); // Updating todo message
    setIsTodoEditable(false); // Exiting edit mode
  };

  // Function to toggle todo completion status
  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };
  console.log({ todo });

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      {/* Checkbox for toggling todo completion */}
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      {/* Input field for editing todo message */}
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        }`}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        readOnly={!isTodoEditable} // Read-only if not in edit mode
      />
      {/* Button for toggling edit mode or saving changes */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return; // Do nothing if todo is completed
          if (isTodoEditable) {
            editTodo(); // Save changes if in edit mode
          } else setIsTodoEditable((prev) => !prev); // Toggle edit mode
        }}
        disabled={todo.completed} // Disable for completed todos
      >
        {isTodoEditable ? "📁" : "✏️"} {/* Display edit or save icon */}
      </button>
      {/* Button for deleting todo */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteToDo(todo.id)} // Delete todo on click
      >
        ❌
      </button>
    </div>
  );
}

export default ToDoItem; // Export the ToDoItem component as default
