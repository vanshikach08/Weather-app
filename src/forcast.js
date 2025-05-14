import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});

  const search = useCallback(
    (city) => {
      const searchCity = city || query;
      if (!searchCity) return;

      axios
        .get(
          `${apiKeys.base}weather?q=${searchCity}&units=metric&APPID=${apiKeys.key}`
        )
        .then((response) => {
  setWeather(response.data);
  // REMOVE setQuery("")
})
        .catch(function (error) {
          console.log(error);
          setWeather({});
          setError({ message: "Not Found", query: searchCity });
        });
    },
    [query]
  );

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  useEffect(() => {
    search("Delhi");
  }, [search]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search(query);
    }
  };

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>

      <div className="today-weather">
        <h3>{props.weather}</h3>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            value={query}
          />
          <div className="img-box">
            <img
              alt="Search"
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              onClick={() => search(query)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        <ul>
          {typeof weather.main !== "undefined" ? (
            <div>
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  className="temp"
                  alt="Weather Icon"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                />
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)} mi
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
              </li>
            </div>
          ) : (
            error && (
              <li>
                {error.query} {error.message}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default Forecast;
