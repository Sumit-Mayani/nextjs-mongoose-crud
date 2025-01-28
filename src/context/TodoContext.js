"use client";

import { createContext, useContext, useState } from "react";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [toast, setToast] = useState({ message: '', type: '' });

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 3000);
  };

  const refreshTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Failed to fetch todos');
      }
      const { data, message } = await response.json();
      setTodos(Array.isArray(data) ? data : []);
      if (message) showToast(message, 'success');
    } catch (error) {
      console.error('Error fetching todos:', error);
      setTodos([]);
      showToast(error.message, 'error');
    }
  };

  const addTodo = async (title) => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Failed to add todo');
      }
      
      const { data, message } = await response.json();
      if (data) {
        setTodos(prevTodos => [...prevTodos, data]);
      }
      if (message) showToast(message, 'success');
    } catch (error) {
      console.error('Error adding todo:', error);
      showToast(error.message, 'error');
    }
  };

  const updateTodo = async (id, title) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Failed to update todo');
      }

      const { data, message } = await response.json();
      if (data) {
        setTodos(prevTodos => prevTodos.map(todo => 
          todo._id === id ? data : todo
        ));
      }
      if (message) showToast(message, 'success');
    } catch (error) {
      console.error('Error updating todo:', error);
      showToast(error.message, 'error');
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}`, { 
        method: "DELETE" 
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Failed to delete todo');
      }

      const { message } = await response.json();
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
      if (message) showToast(message, 'success');
    } catch (error) {
      console.error('Error deleting todo:', error);
      showToast(error.message, 'error');
    }
  };

  return (
    <TodoContext.Provider value={{ 
      todos, 
      refreshTodos, 
      addTodo, 
      updateTodo, 
      deleteTodo,
      toast,
      setToast 
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  return useContext(TodoContext);
}
