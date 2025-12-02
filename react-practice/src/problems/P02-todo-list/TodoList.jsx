import React, { useState } from "react";
import TodoItem from "./TodoItem";

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTodo = { id: makeId(), text: trimmed, completed: false };
    setTodos((prev) => [newTodo, ...prev]);
    setText("");
  };

  const handleToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: 540, margin: "24px auto", padding: 12 }}>
      <h2>Todo List</h2>
      <form
        onSubmit={handleAdd}
        style={{ display: "flex", gap: 8, marginBottom: 12 }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a todo"
          style={{ flex: 1, padding: "8px 10px" }}
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
      {todos.length === 0 ? (
        <p style={{ color: "#666" }}>No todos yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => handleToggle(todo.id)}
              onDelete={() => handleDelete(todo.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
