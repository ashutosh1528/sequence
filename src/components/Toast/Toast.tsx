import { ToastType } from "../../types/Toast.type";

const Toast = ({ toast, index }: { toast: ToastType; index: number }) => {
  const type = toast.type;
  const getToastVariantClass = () => {
    if (type === "success") return "toast__success";
    if (type === "error") return "toast__error";
    if (type === "warning") return "toast__warning";
  };

  const getToastPoisiton = () => {
    return 8 + index * 56;
  };
  return (
    <div
      className={`toast__container__individual ${getToastVariantClass()}`}
      style={{ bottom: getToastPoisiton() }}
    >
      <div>{toast.message}</div>
    </div>
  );
};

export default Toast;
