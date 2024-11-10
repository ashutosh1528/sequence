import { useContext } from "react";
import { ToastContext } from "../context/Toast.context";

export const useToast = () => useContext(ToastContext);
