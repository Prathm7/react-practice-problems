import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import ToastContainer from "./ToastContainer";

const ADD = "ADD_TOAST";
const REMOVE = "REMOVE_TOAST";

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

function reducer(state, action) {
  switch (action.type) {
    case ADD:
      return [...state, action.payload];
    case REMOVE:
      return state.filter((t) => t.id !== action.payload);
    default:
      return state;
  }
}

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, dispatch] = useReducer(reducer, []);

  const showToast = useCallback((message, opts = {}) => {
    const { type = "info", duration = 4000 } = opts;
    const id = makeId();
    const toast = { id, message, type };
    dispatch({ type: ADD, payload: toast });

    const timer = setTimeout(() => {
      dispatch({ type: REMOVE, payload: id });
    }, duration);

    return () => {
      clearTimeout(timer);
      dispatch({ type: REMOVE, payload: id });
    };
  }, []);

  const removeToast = useCallback((id) => {
    dispatch({ type: REMOVE, payload: id });
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
