import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import Footer from "../Footer/Footer";
import { coordinates, APIkey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    condition: "",
    isDay: true,
    temp: { F: 999, C: 999 },
    type: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("C");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "C" ? "F" : "C");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
    setIsMobileMenuActive(false);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            isMobileMenuActive={isMobileMenuActive}
            setIsMobileMenuActive={setIsMobileMenuActive}
          ></Header>
          <Main
            weatherData={weatherData}
            handleCardClick={handleCardClick}
            isMobileMenuActive={isMobileMenuActive}
          />

          <ModalWithForm
            titleText="New garment"
            btnText="Add garment"
            activeModal={activeModal}
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
          >
            <label htmlFor="name-input" className="modal__label">
              Name
              <input
                id="name-input"
                type="text"
                className="modal__input"
                placeholder="Name"
              />
              <span className="modal__error" id="name-input-error"></span>
            </label>
            <label htmlFor="image-input" className="modal__label">
              Image
              <input
                id="image-input"
                type="url"
                className="modal__input"
                placeholder="Image URL"
              />
            </label>
            <fieldset className="modal__radio-btns">
              <legend className="modal__legend">
                Select the weather type:
              </legend>
              <label
                htmlFor="hot"
                className="modal__label modal__label_type_radio"
              >
                <input
                  id="hot"
                  type="radio"
                  className="modal__radio-input"
                  name="weather-type"
                />
                Hot
              </label>
              <label
                htmlFor="warm"
                className="modal__label modal__label_type_radio"
              >
                <input
                  id="warm"
                  type="radio"
                  className="modal__radio-input"
                  name="weather-type"
                />
                Warm
              </label>
              <label
                htmlFor="cold"
                className="modal__label modal__label_type_radio"
              >
                <input
                  id="cold"
                  type="radio"
                  className="modal__radio-input"
                  name="weather-type"
                />
                Cold
              </label>
            </fieldset>
          </ModalWithForm>
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
          />
          <Footer />
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
