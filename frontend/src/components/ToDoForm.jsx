import { useState } from "react";
import { useTodo } from "../contexts"; // Importing the custom hook from the context file

function ToDoForm() {
  const [toDo, setToDo] = useState(""); // State to hold the input value
  const { addToDo } = useTodo(); // Using the custom hook to access context functions

  // Function to add a new todo
  const add = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!toDo) return; // Do nothing if the input is empty
    addToDo({ toDo, completed: false }); // Call the addToDo function from context
  };

  return (
    <form className="flex" onSubmit={add}>
      {/* Form for adding todos */}
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={toDo}
        onChange={(e) => setToDo(e.target.value)} // Update the state on input change
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default ToDoForm; // Export the ToDoForm component as default
