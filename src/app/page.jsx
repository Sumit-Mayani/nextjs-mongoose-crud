// app/page.js
"use client";

import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import Toast from "@/components/Toast";
import { TodoProvider, useTodo } from "@/context/TodoContext";

function TodoApp() {
  const { toast, setToast } = useTodo();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Todo List</h1>
      <TodoForm />
      <TodoList />
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: '' })} 
      />
    </div>
  );
}

export default function Home() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}
