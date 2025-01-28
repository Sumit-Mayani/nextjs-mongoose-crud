// app/components/TodoList.js
"use client";

import { useEffect, useState } from "react";
import { useTodo } from "@/context/TodoContext";

const TodoList = () => {
  const { todos, refreshTodos, updateTodo, deleteTodo } = useTodo();
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    refreshTodos();
  }, []);

  const handleEdit = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.title);
  };

  const handleUpdate = async (id) => {
    await updateTodo(id, editText);
    setEditingId(null);
    setEditText("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditText("");
  };

  if (!Array.isArray(todos)) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading todos...</div>;
  }

  if (todos.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>No todos found. Add some!</div>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.map((todo) => (
        <li key={todo._id} style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '10px',
          padding: '10px',
          backgroundColor: '#f5f5f5',
          borderRadius: '5px'
        }}>
          {editingId === todo._id ? (
            <div style={{ display: 'flex', gap: '10px', flex: 1 }}>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                style={{
                  flex: 1,
                  padding: '5px',
                  borderRadius: '3px',
                  border: '1px solid #ddd'
                }}
              />
              <button
                onClick={() => handleUpdate(todo._id)}
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <span style={{ flex: 1 }}>{todo.title}</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleEdit(todo)}
                  style={{
                    backgroundColor: '#2196F3',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
