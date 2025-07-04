import React, { useState, useEffect } from "react";
import axios from "axios";
import FormattedDate from "./FormattedDate";
import Degrees from "./Degrees";

export default function Search({ onForecastChange }) {
  const [temperature, setTemperature] = useState();
  const [city, setCity] = useState("Medellín");

  function showTemp(response) {
    setTemperature({
      temp: response.data.temperature.current,
      description: response.data.condition.description,
      icon: response.data.condition.icon_url,
      wind: response.data.wind.speed,
      date: new Date(response.data.time * 1000),
    });
  }

  // ✅ useEffect sin warnings
  useEffect(() => {
    const apiKey = "fb3o96aeef26e064f124eb8cta459256";
    const cityName = "Medellín";
    const currentUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}`;
    const forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}&days=5`;

    // ✅ Declarar showForecast adentro
    function showForecast(response) {
      onForecastChange(response.data.daily);
    }

    axios.get(currentUrl).then(showTemp);
    axios.get(forecastUrl).then(showForecast);
  }, [onForecastChange]); 
  function searchCity(cityName) {
    const apiKey = "fb3o96aeef26e064f124eb8cta459256";
    const currentUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}`;
    const forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}&days=5`;

    axios.get(currentUrl).then(showTemp);
    axios
      .get(forecastUrl)
      .then((response) => onForecastChange(response.data.daily));
  }

  function handleSubmit(event) {
    event.preventDefault();
    searchCity(city);
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  return (
    <div className="weatherResult">
      <form onSubmit={handleSubmit}>
        <input
          className="search"
          type="search"
          onChange={handleCityChange}
          value={city}
          placeholder="Ingresa una ciudad"
        />
        <input className="submitButton" type="submit" value="Buscar" />
      </form>

      {temperature && (
        <div className="weatherResult">
          <ul className="weatherInfoList">
            <li>The temperature in {city} is:</li>
            <li className="currentTemp">
              <Degrees celsius={temperature.temp} city={city} />
            </li>
            <li>
              <img src={temperature.icon} alt={temperature.description} />
            </li>
            <li>
              <FormattedDate date={temperature.date} />
            </li>
            <li>Condition: {temperature.description}</li>
            <li>Wind {temperature.wind} km/h</li>
          </ul>
        </div>
      )}
    </div>
  );
}
