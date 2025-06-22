import React, { useState } from "react";
import "./App.css";

import Search from "./Search"
import WeekDays from "./WeekDays";

export default function App() {

  const [forecast, setForecast] = useState([]);

  return (
    <>
      <div className="App">
        <Search onForecastChange={setForecast} />
        {forecast.length > 0 && <WeekDays forecast={forecast} />}
      </div>

      <div className="footer">
        <p>
          Code by Cata Betancur{" "}
          <a
            href="https://github.com/catabetancur0719/weather-app-with-React"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub{" "}
          </a>
          and hosted on{" "}
          <a
            href="https://my-weather-app-with-react.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Netlify
          </a>
        </p>
      </div>
    </>
  );
}

