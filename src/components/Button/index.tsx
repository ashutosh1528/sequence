import "./index.scss";

type ButtonProps = {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: "large" | "medium" | "small";
  disabled?: boolean;
};
const Button = ({
  label,
  size = "medium",
  onClick,
  disabled = false,
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
    >
      {label}
    </button>
  );
};

export default Button;
