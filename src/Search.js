import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  const [temperature, setTemperature] = useState();
  const [city, setCity] = useState("");

  function showTemp(response) {
    setTemperature({
      temp: response.data.temperature.current,
      description: response.data.condition.description,
      icon: response.data.condition.icon_url,
      wind: response.data.wind.speed,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Buscando clima de:", city);
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=fb3o96aeef26e064f124eb8cta459256`;
    axios.get(apiUrl).then(showTemp);
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
          <ul>
            <p>The temperature in {city} is:</p>
            <p className="currentTemp">{Math.round(temperature.temp)}°C</p>

            <p>
              <img src={temperature.icon} alt={temperature.description} />
            </p>
            <p>Condition: {temperature.description}</p>
            <p>Wind {temperature.wind} km/h</p>
          </ul>
        </div>
      )}
    </div>
  );
}
