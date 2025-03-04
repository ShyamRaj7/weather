import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import WeatherDetailsPage from "./WeatherDetailsPage"; // Import the new page
import "./App.css";

/*Images*/
import searchIcon from "./assets/search.png";
import clearIcon from "./assets/clear.gif";
import cloudIcon from "./assets/cloud.gif";
import drizzleIcon from "./assets/drizzle.gif";
import rainIcon from "./assets/rain.gif";
import snowIcon from "./assets/snow.gif";
import humidityIcon from "./assets/humidity.gif";
import windIcon from "./assets/wind.gif";
import settingsIcon from "./assets/settings.png"; // Add settings icon

const WeatherDetails = ({ icon, temp, city, country, lat, lon, humidity, wind, isCelsius, toggleUnit }) => {
  const [showHumidity, setShowHumidity] = useState(false);
  const [showWind, setShowWind] = useState(false);

  const toggleHumidity = () => {
    setShowHumidity(!showHumidity);
    setShowWind(false); // Hide wind details if humidity is clicked
  };

  const toggleWind = () => {
    setShowWind(!showWind);
    setShowHumidity(false); // Hide humidity details if wind is clicked
  };

  return (
    <>
      <div className="image">
        <img src={icon} alt="Weather Icon" />
      </div>
      <div className="temp">{temp}°{isCelsius ? 'C' : 'F'}</div>
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
        <div className="element" onClick={toggleHumidity}>
          <img src={humidityIcon} alt="humidity" className="icon" />
          <div className="data">
            <div className="text">Humidity</div>
            {showHumidity && <div className="humidity-percent">{humidity}%</div>}
          </div>
        </div>
        <div className="element" onClick={toggleWind}>
          <img src={windIcon} alt="wind" className="icon" />
          <div className="data">
            <div className="text">Wind Speed</div>
            {showWind && <div className="wind-percent">{wind} km/h</div>}
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
  const [isCelsius, setIsCelsius] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

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

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
    setTemp(isCelsius ? (temp * 9/5) + 32 : (temp - 32) * 5/9);
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <div className="input-container">
          <input
            type="text"
            className="cityInput"
            placeholder="Search City"
            onChange={handleCity}
            value={text}
            onKeyDown={handleKeyDown}
          />
          <div className="search-icon" onClick={() => search()}>
            <img src={searchIcon} alt="search" />
          </div>
        </div>
        <div className="settings-icon" onClick={() => setShowSettings(!showSettings)}>
          <img src={settingsIcon} alt="settings" />
        </div>
      </div>
      {showSettings && (
        <div className="settings-modal">
          <div className="settings-content">
            <h3>Settings</h3>
            <label>
              <input
                type="checkbox"
                checked={isCelsius}
                onChange={toggleUnit}
              />
              Use Celsius
            </label>
          </div>
        </div>
      )}
      <WeatherDetails
        icon={icon}
        temp={temp}
        city={city}
        country={country}
        lat={lat}
        lon={lon}
        humidity={humidity}
        wind={wind}
        isCelsius={isCelsius}
        toggleUnit={toggleUnit}
      />
      <p className="copyright">
        Designed by <span>Shyam Raj</span>
      </p>
    </div>
  );
}

// Main App with Routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherApp />} />
        
        <Route path="/details" element={<WeatherDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;