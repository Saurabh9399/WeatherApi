// src/Weather.js
import React, { useState, useEffect, useRef } from "react";

const Weather = ({ api_key: apiKey }) => {
  console.log("apikey", apiKey);
  const [weatherData, setWeatherData] = useState(null);
  const inputRef = useRef(null);

  // State to store the input value
  const [inputValue, setInputValue] = useState("");
  console.log(inputValue, "inputValue");
  useEffect(() => {
    // Check if data is cached in localStorage
    const cachedData = localStorage.getItem("weatherData");
    if (cachedData && !inputValue) {
      console.log("inside IF");
      setWeatherData(JSON.parse(cachedData));
    } else {
      fetchWeatherData();
    }
  }, [inputValue]);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`
      );
      if (response.ok) {
        const data = await response.json();
        // Cache the data in localStorage
        localStorage.setItem("weatherData", JSON.stringify(data));
        setWeatherData(data);
      } else {
        console.error("Failed to fetch weather data");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleInputChange = () => {
    setInputValue(inputRef.current.value);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        ref={inputRef}
        onChange={handleInputChange}
        value={inputValue}
        placeholder="Search...."
      />
      {weatherData ? (
        <div>
          <h2>Current Weather in {inputValue}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;
