import "./index.scss";

type ButtonProps = {
  label: string;
  size?: "large" | "medium" | "small";
};
const Button = ({ label, size = "medium" }: ButtonProps) => {
  const getButtonSizeClass = () => {
    if (size === "large") return "button__large";
    if (size === "small") return "button__small";
    return "button__medium";
  };
  return <button className={`button ${getButtonSizeClass()}`}>{label}</button>;
};

export default Button;
