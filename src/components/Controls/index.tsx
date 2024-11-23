import Button from "../Button";
import "./index.scss";

const Controls = () => {
  return (
    <div className="controls__container">
      <Button label="Discard card" />
      <Button label="End turn " />
    </div>
  );
};

export default Controls;
