import React, { useState, useEffect } from "react";
import apiKeys from "./apiKeys";
import Forcast from "./forcast";
import loader from "./images/WeatherIcons.gif";
import ReactAnimatedWeather from "react-animated-weather";

// Custom hook to fetch geolocation
const useGeolocation = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("Error getting geolocation:", err);
      }
    );
  }, []);

  return location;
};

const dateBuilder = (d) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday",
  ];
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

const LiveClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return <div className="current-time">{time.toLocaleTimeString()}</div>;
};

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

const Weather = () => {
  const { lat, lon } = useGeolocation();
  const [weatherData, setWeatherData] = useState({
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    main: undefined,
  });

  const getWeather = async (lat, lon) => {
    try {
      const res = await fetch(
        `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
      );
      const data = await res.json();
      const weatherMain = data.weather[0].main;

      const iconMap = {
        Haze: "CLEAR_DAY",
        Clouds: "CLOUDY",
        Rain: "RAIN",
        Snow: "SNOW",
        Dust: "WIND",
        Drizzle: "SLEET",
        Fog: "FOG",
        Smoke: "FOG",
        Tornado: "WIND",
      };

      setWeatherData({
        city: data.name,
        temperatureC: Math.round(data.main.temp),
        temperatureF: Math.round(data.main.temp * 1.8 + 32),
        humidity: data.main.humidity,
        main: weatherMain,
        country: data.sys.country,
        icon: iconMap[weatherMain] || "CLEAR_DAY",
      });
    } catch (err) {
      console.error("Failed to fetch weather data:", err);
    }
  };

  useEffect(() => {
    if (lat && lon) {
      getWeather(lat, lon);
      const timer = setInterval(() => getWeather(lat, lon), 600000);
      return () => clearInterval(timer);
    }
  }, [lat, lon]);

  const { temperatureC, city, country, icon, main } = weatherData;

  if (temperatureC) {
    return (
      <>
        <div className="city">
          <div className="title">
            <h2>{city}</h2>
            <h3>{country}</h3>
          </div>
          <div className="mb-icon">
            <ReactAnimatedWeather
              icon={icon}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            />
            <p>{main}</p>
          </div>
          <div className="date-time">
            <div className="dmy">
              <LiveClock />
              <div className="current-date">{dateBuilder(new Date())}</div>
            </div>
            <div className="temperature">
              <p>
                {temperatureC}°<span>C</span>
              </p>
            </div>
          </div>
        </div>
        <Forcast icon={icon} weather={main} />
      </>
    );
  }

  return (
    <>
      <img
        src={loader}
        style={{ width: "50%", WebkitUserDrag: "none" }}
        alt="Loading weather icon"
      />
      <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
        Detecting your location
      </h3>
      <h3 style={{ color: "white", marginTop: "10px" }}>
        Your current location will be displayed on the App <br />
        & used for calculating Real time weather.
      </h3>
    </>
  );
};

export default Weather;
