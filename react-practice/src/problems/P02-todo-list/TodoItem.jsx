import React from "react";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 10px",
        borderBottom: "1px solid #eee",
      }}
    >
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
        }}
      >
        <input type="checkbox" checked={todo.completed} onChange={onToggle} />
        <span
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "#888" : "#000",
          }}
        >
          {todo.text}
        </span>
      </label>

      <button onClick={onDelete} aria-label={`Delete ${todo.text}`}>
        Delete
      </button>
    </li>
  );
}
