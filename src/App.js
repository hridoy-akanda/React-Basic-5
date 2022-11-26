import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=39cf190d3fe31cc6cc9000ea99c78261`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="top">
          <div className="search">
            <input
              value={location}
              type="text"
              placeholder="Search location"
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={searchLocation}
            />
          </div>
          <div className="city">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main && <h1>{data.main.temp.toFixed()}°C</h1>}
          </div>
          <div className="description">
            {data.weather && <p>{data.weather[0].main}</p>}
          </div>
        </div>

        {data.name && (
          <div className="bottom">
            <div className="feelsLike">
              {data.main && (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              )}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main && (
                <p className="bold">{data.main.humidity.toFixed()}%</p>
              )}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind && (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              )}
              <p>Wind</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
