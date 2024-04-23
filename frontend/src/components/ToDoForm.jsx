import { useState } from "react";
import { useTodo } from "../contexts"; // Importing the custom hook from the context file

function ToDoForm() {
  const [title, setTitle] = useState(""); // State to hold the input value
  const [inputError, setInputError] = useState(""); // State to track error
  const { addToDo } = useTodo(); // Using the custom hook to access context functions

  // Function to add a new todo
  const add = (e) => {
    e.preventDefault(); // Prevent default form submission
    setInputError("");

    if (!title.trim()) {
      setInputError("Please enter a task");
      return;
    }

    addToDo({ title, completed: false }); // Call the addToDo function from context
    setTitle("");
  };

  return (
    <div className="flex flex-col">
      <form className="flex" onSubmit={add}>
        {/* Form for adding todos */}
        <input
          type="text"
          placeholder="Write Todo..."
          className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Update the state on input change
        />
        <button
          type="submit"
          className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
        >
          Add
        </button>
      </form>
      {inputError && <p className="text-red-500">{inputError}</p>}
    </div>
  );
}

export default ToDoForm; // Export the ToDoForm component as default
