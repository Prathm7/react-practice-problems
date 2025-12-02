import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Counter from "./problems/P01-basic-counter/BasicCounter";
import TodoList from "./problems/P02-todo-list/TodoList";
import LoginForm from "./problems/P03-controlled-form-input/ControlledForm";
import Shop from "./problems/P04–parent-child-lifting-state/Shop";
import Tabs from "./problems/P05-tabs-component/Tabs";
import Tab from "./problems/P05-tabs-component/Tab";
import Clock from "./problems/P06-auto-updating-clock/Clock";
import SearchWithDebounce from "./problems/P07-search-with-debounce/SearchWithDebounce";
import WindowSizeDisplay from "./problems/P08-window-size-hook/WindowSizeDisplay";
import Dropdown from "./problems/P09-click-outside-to-close/Dropdown";
import ScrollToTopButton from "./problems/P10-scroll-to-top-button/ScrollToTopButton";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Counter />
      <TodoList />
      <LoginForm />
      <Shop />
      <Tabs>
        <Tab label="Home">This is the Home tab content.</Tab>
        <Tab label="Profile">Here is your Profile content.</Tab>
        <Tab label="Settings">Settings content displayed here.</Tab>
      </Tabs>
      <Clock />
      <SearchWithDebounce />
      <WindowSizeDisplay />
      <Dropdown />
      <ScrollToTopButton />
    </>
  );
}

export default App;
