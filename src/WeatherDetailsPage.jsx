import { useLocation } from "react-router-dom";

const WeatherDetailsPage = () => {
  const location = useLocation();
  const { title, value, unit } = location.state || { title: "", value: "", unit: "" };

  return (
    <div className="details-page">
      <h2>{title}</h2>
      <p>
        {value} {unit}
      </p>
    </div>
  );
};

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

export default WeatherDetailsPage;