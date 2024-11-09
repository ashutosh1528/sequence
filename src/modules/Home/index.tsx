import Button from "../../components/Button";
import "./index.scss";

const Home = () => {
  return (
    <div className="home__container">
      <h1 className="home__title">Sequence</h1>
      <div className="home__container__button">
        <Button label="Create Game" size="large" />
        <Button label="Join Game" size="large" />
      </div>
    </div>
  );
};

export default Home;
