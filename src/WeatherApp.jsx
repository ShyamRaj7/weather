import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import SettingsPage from "./SettingsPage";


import "./App.css";

/* Images */
    
import clearIcon from "./assets/clear.gif";
import cloudIcon from "./assets/cloud.gif";
import drizzleIcon from "./assets/drizzle.gif";
import rainIcon from "./assets/rain.gif";
import snowIcon from "./assets/snow.gif";
import humidityIcon from "./assets/humidity.gif";
import windIcon from "./assets/wind.gif";
import settingsIcon from "./assets/settings.png";

const WeatherDetails = ({ icon, temp, city, country, lat, lon, humidity, wind, unit }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="image">
        <img src={icon} alt="Weather Icon" />
      </div>
      <div className="temp">{temp}°{unit === "Imperial" ? "F" : "C"}</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="lon">Longitude</span>
          <span>{lon}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element" onClick={() => navigate("/details", { state: { title: "Humidity", value: humidity, unit: "%" } })}>
          <img src={humidityIcon} alt="humidity" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element" onClick={() => navigate("/details", { state: { title: "Wind Speed", value: wind, unit: unit === "Imperial" ? "mph" : "km/h" } })}>
          <img src={windIcon} alt="wind" className="icon" />
          <div className="data">
            <div className="wind-percent">{wind} {unit === "Imperial" ? "mph" : "km/h"}</div>
            <div className="text">Wind Speed</div>
            <div>
      <h1>Weather App</h1>
      <Link to="/settings">
        <button>Go to Settings</button>
      </Link>
    </div>

          </div>
        </div>
      </div>
    </>
  );
};

function WeatherApp() {
  let api_key = "e16cc4a769046fb52b6f73d097dfdac6";
  const [text, setText] = useState("Chennai");
  const [icon, setIcon] = useState(snowIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Chennai");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("Metric");
  const navigate = useNavigate();

  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=${unit === "Imperial" ? "imperial" : "metric"}`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        console.error("City not found");
        setLoading(false);
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLon(data.coord.lon);
      setIcon(data.main.temp > 25 ? clearIcon : data.main.temp < 10 ? snowIcon : cloudIcon);
    } catch (error) {
      console.error("An error occurred:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUnit = localStorage.getItem("temperatureUnit");
    if (storedUnit) {
      setUnit(storedUnit);
    }
  }, []);

  useEffect(() => {
    search();
  }, [unit]);

  return (
    <div className="container">
      <div className="header">
        <div className="settings-icon" onClick={() => navigate("/settings")}> <img src={settingsIcon} alt="Settings" /></div>
      </div>
      <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} lon={lon} humidity={humidity} wind={wind} unit={unit} />
    </div>
  );
}

function SettingsPage() {
  const navigate = useNavigate();
  const [units, setUnits] = useState("Metric");

  useEffect(() => {
    const savedUnit = localStorage.getItem("temperatureUnit");
    if (savedUnit) {
      setUnits(savedUnit);
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem("temperatureUnit", units);
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Settings</h2>
      <label>
        <input type="radio" name="units" value="Metric" checked={units === "Metric"} onChange={() => setUnits("Metric")} /> Celsius (°C)
      </label>
      <label>
        <input type="radio" name="units" value="Imperial" checked={units === "Imperial"} onChange={() => setUnits("Imperial")} /> Fahrenheit (°F)
      </label>
      <button onClick={saveSettings}>Save</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherApp />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/details" element={<WeatherDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
