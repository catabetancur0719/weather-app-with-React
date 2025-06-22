import React from "react";

export default function WeekDays({forecast}) {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="days">
      <ul>
        {forecast.map((day, index) => {
          const date = new Date(day.time * 1000);
          const dayName = weekDays[date.getDay()];
          return (
            <li key={index}>
              {dayName}
              <br />
              <img
                src={day.condition.icon_url}
                alt={day.condition.description}
                width={30}
              />
              <br />
              {Math.round(day.temperature.minimum)}° -{" "}
              {Math.round(day.temperature.maximum)}°
            </li>
          );
        })}
      </ul>
    </div>
  );
}
