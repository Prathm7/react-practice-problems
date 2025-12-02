import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Counter from "./problems/P01-basic-counter/BasicCounter";
import TodoList from "./problems/P02-todo-list/TodoList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Counter />
      <TodoList />
    </>
  );
}

export default App;
