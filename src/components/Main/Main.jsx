import { defaultClothingItems } from "../../utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./randomize.css";
import randomizeIcon from "../../assets/randomize-icon.svg";

function Main({ weatherData, handleCardClick, isMobileMenuActive }) {
  return (
    <main className="main">
      <WeatherCard
        weatherData={weatherData}
        isMobileMenuActive={isMobileMenuActive}
      />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.C}&deg;C / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
      <section className="randomize">
        <button className="randomize__btn">
          <img
            src={randomizeIcon}
            alt="randomize-icon"
            className="randomize__icon"
          />
          Randomize
        </button>
      </section>
      <section>
        <ModalWithForm />
      </section>
    </main>
  );
}

export default Main;
