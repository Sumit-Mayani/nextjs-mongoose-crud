// src/components/TodoForm.js
"use client";

import { useState } from "react";
import { useTodo } from "@/context/TodoContext";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const { addTodo } = useTodo();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTodo(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
