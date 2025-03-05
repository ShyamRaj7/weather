import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SettingsPage from "./SettingsPage"
import WeatherDetailsPage from "./WeatherDetailsPage";


function SettingsPage() {
  const navigate = useNavigate();
  const [units, setUnits] = useState("Metric"); // Default to Metric (Celsius)

  // Save settings to localStorage
  const saveSettings = () => {
    localStorage.setItem("temperatureUnit", units);
    alert("Settings saved successfully!");
    navigate("/"); // Navigate back to the weather page after saving
  };

  // Load saved settings from localStorage
  useEffect(() => {
    const savedUnit = localStorage.getItem("temperatureUnit");
    if (savedUnit) {
      setUnits(savedUnit);
    }
  }, []);

  return (
    <div className="container settings-container">
      <div className="settings-header">
        <h2>Settings</h2>
        <button className="back-button" onClick={() => navigate("/")}>
          Back to Weather
        </button>
      </div>

      <div className="settings-section">
        <h3>Temperature Units</h3>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="units"
              value="Metric"
              checked={units === "Metric"}
              onChange={() => setUnits("Metric")}
            />
            Celsius (°C)
          </label>
          <label>
            <input
              type="radio"
              name="units"
              value="Imperial"
              checked={units === "Imperial"}
              onChange={() => setUnits("Imperial")}
            />
            Fahrenheit (°F)
          </label>
        </div>
      </div>

      <button className="save-button" onClick={saveSettings}>
        Save Settings
      </button>
    </div>
  );
}

// Import missing components
import WeatherApp from "./WeatherApp";
import WeatherDetailsPage from "./WeatherDetailsPage";

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
