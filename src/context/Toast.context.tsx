import { createContext, useReducer } from "react";
import ToastContainer from "../components/Toast";
import { ToastType } from "../types/Toast.type";

type ToastContextType = {
  success: (message: ToastType["message"]) => void;
};
export const ToastContext = createContext<ToastContextType | null>(null);

type ToastActionType = {
  type: "ADD_TOAST";
  payload: any;
};
type ToastStateType = {
  toasts: ToastType[];
};
const initialState = {
  toasts: [],
};

const toastReducer = (state: ToastStateType, action: ToastActionType) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const ToastContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const addToast = (type: ToastType["type"], message: ToastType["message"]) => {
    const id = Math.floor(Math.random() * 10000000);
    dispatch({ type: "ADD_TOAST", payload: { id, message, type } });
  };

  const success = (message: ToastType["message"]) => {
    addToast("success", message);
  };

  const value = {
    success,
  };

  return (
    <ToastContext.Provider value={value}>
      <ToastContainer toasts={state.toasts} />
      {children}
    </ToastContext.Provider>
  );
};

export const { Consumer } = ToastContext;
