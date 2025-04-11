import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData, isMobileMenuActive }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section
      className={`weather-card ${
        isMobileMenuActive ? "weather-card__hidden" : ""
      }`}
    >
      <p className="weather-card__temperature">{weatherData.temp.C}&deg;C</p>
      <img
        src={weatherOption?.url}
        alt={`Image showing ${weatherOption?.day ? "day" : "night"}time ${
          weatherOption?.condition
        }`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
