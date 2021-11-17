import { useState } from "react";
import "./app.css";

function App() {
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState(" ");
  const [humidity, setHumidity] = useState(" ");
  const [wind, setWind] = useState(" ");
  const [city, setCity] = useState("");

  const [country, setCountry] = useState("");
  const getWeather = (city, country) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=ef46c698d33f0f033288cfad7a301616`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTemperature((data.main.temp - 273.15).toFixed(2));
        setDescription(data.weather[0].main);
        setWind(data.wind.speed);
        setHumidity(data.main.humidity);
      })
      .catch((error) => {
        console.log(error);
        setCity(" ");
        setCountry(" ");
      });
  };
  const changeHandlerCity = (e) => {
    setCity(e.target.value);
    if (!city || city === " ") return;
  };

  const changeHandlerCountry = (e) => {
    setCountry(e.target.value);
    if (!country || country === " ") return;
  };

  console.log(country);
  return (
    <div className="container">
      <h1>Weather app</h1>
      <input
        type="text"
        value={city}
        onChange={changeHandlerCity}
        placeholder="City"
      />
      <input
        type="text"
        value={country}
        onChange={changeHandlerCountry}
        placeholder="Country"
      />
      <button
        onClick={() => {
          getWeather(city, country);
        }}
      >
        GET
      </button>
      <div className="temperature">
        Temperature: {temperature} °C <br /> Description: {description} <br />{" "}
        Humidity: {humidity} % <br />
        Speed of wind: {wind} <br />
      </div>
    </div>
  );
}

export default App;
