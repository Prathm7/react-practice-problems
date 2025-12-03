import React, { useReducer, useState } from "react";

const ADD = "ADD";
const TOGGLE = "TOGGLE";
const DELETE = "DELETE";
const CLEAR_COMPLETED = "CLEAR_COMPLETED";

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

function reducer(state, action) {
  switch (action.type) {
    case ADD: {
      const text = (action.payload || "").trim();
      if (!text) return state;
      const newTodo = { id: makeId(), text, completed: false };
      return { ...state, todos: [newTodo, ...state.todos] };
    }

    case TOGGLE: {
      const id = action.payload;
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        ),
      };
    }

    case DELETE: {
      const id = action.payload;
      return { ...state, todos: state.todos.filter((t) => t.id !== id) };
    }

    case CLEAR_COMPLETED: {
      return { ...state, todos: state.todos.filter((t) => !t.completed) };
    }

    default:
      return state;
  }
}

const initialState = {
  todos: [],
};

export default function TodoAppWithReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch({ type: ADD, payload: text });
    setText("");
  };

  const activeCount = state.todos.filter((t) => !t.completed).length;
  const completedCount = state.todos.length - activeCount;

  return (
    <div style={{ maxWidth: 640, margin: "24px auto", padding: 16 }}>
      <h2>Todo (useReducer)</h2>

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
        <button type="submit">Add</button>
      </form>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <div>
          <strong>{activeCount}</strong> active •{" "}
          <strong>{completedCount}</strong> completed
        </div>
        <div>
          <button
            onClick={() => dispatch({ type: CLEAR_COMPLETED })}
            disabled={completedCount === 0}
          >
            Clear completed
          </button>
        </div>
      </div>

      {state.todos.length === 0 ? (
        <p style={{ color: "#666" }}>No todos yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {state.todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 10px",
                borderBottom: "1px solid #f0f0f0",
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
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch({ type: TOGGLE, payload: todo.id })}
                />
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#888" : "#000",
                  }}
                >
                  {todo.text}
                </span>
              </label>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => dispatch({ type: DELETE, payload: todo.id })}
                  aria-label={`Delete ${todo.text}`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
