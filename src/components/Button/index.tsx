import "./index.scss";

type ButtonProps = {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: "large" | "medium" | "small";
  disabled?: boolean;
  width?: number;
};
const Button = ({
  label,
  size = "medium",
  onClick,
  disabled = false,
  width,
}: ButtonProps) => {
  const getButtonSizeClass = () => {
    if (size === "large") return "button__large";
    if (size === "small") return "button__small";
    return "button__medium";
  };

  const getDisabledClass = () => {
    if (disabled) return "button__disabled";
    return "";
  };
  return (
    <button
      className={`button ${getButtonSizeClass()} ${getDisabledClass()}`}
      onClick={onClick}
      style={{ width: width ? `${width}px` : "" }}
    >
      {label}
    </button>
  );
};

export default Button;
