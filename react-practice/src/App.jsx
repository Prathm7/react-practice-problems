import React, { useState, useContext } from "react";
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
import CounterWithPrevious from "./problems/P11-use-previous-hook/CounterWithPrevious";
import TodoAppWithReducer from "./problems/P13-todo-with-useReducer/TodoAppWithReducer";
import {
  ThemeContext,
  ThemeProvider,
} from "./problems/P14-theme-context/theme-context";

function AppContent() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Theme: {theme}</h1>

      <button
        onClick={toggleTheme}
        style={{
          marginTop: 20,
          padding: "10px 16px",
          fontSize: "16px",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Toggle Theme
      </button>

      <div className="card" style={{ marginTop: 30, padding: 20 }}>
        This card background and text color change with the theme.
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
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
      <CounterWithPrevious />
      <TodoAppWithReducer />
      <AppContent />
    </ThemeProvider>
  );
}
