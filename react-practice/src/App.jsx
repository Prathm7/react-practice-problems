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
import AuthLoginForm from "./problems/P15-auth-context/LoginForm";
import AuthButton from "./problems/P15-auth-context/AuthButton";
import Home from "./problems/P15-auth-context/Home";
import { AuthProvider } from "./problems/P15-auth-context/auth-context";
import { ToastProvider } from "./problems/P16-global-toast-notifications/toast-context";
import { useToast } from "./problems/P16-global-toast-notifications/toast-context";
import SignupForm from "./problems/P17-signup-form-validations/SignupForm";
import PhoneNumbersForm from "./problems/P18-dynamic-form-fields/PhoneNumbersForm";
import ExampleForm from "./problems/P19-reusable-text-fields/ExampleForm";
import MultiStepForm from "./problems/P20-multii-step-form/MultiStepForm";

function AppContent() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { showToast } = useToast();

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
      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => showToast("Saved successfully", { type: "success" })}
        >
          Show Success Toast
        </button>
        <button
          style={{ marginLeft: 8 }}
          onClick={() =>
            showToast("Something went wrong", { type: "error", duration: 6000 })
          }
        >
          Show Error Toast
        </button>
      </div>
      <div className="card" style={{ marginTop: 30, padding: 20 }}>
        This card background and text color change with the theme.
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <ThemeProvider>
        <AuthProvider>
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
          <Home />
          <AuthLoginForm />
          <AuthButton />
          <SignupForm />
          <PhoneNumbersForm />
          <ExampleForm />
          <MultiStepForm />
        </AuthProvider>
      </ThemeProvider>
    </ToastProvider>
  );
}
