import Toast from "./Toast";
import { ToastType } from "../../types/Toast.type";
import "./index.scss";

const ToastContainer = ({ toasts }: { toasts: ToastType[] }) => {
  return (
    <div>
      {toasts.map((toast, idx) => (
        <Toast key={toast.id} toast={toast} index={idx} />
      ))}
    </div>
  );
};

export default ToastContainer;
