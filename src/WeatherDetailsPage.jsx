import "./WeatherDetailsPage.css";
import { useLocation, useNavigate } from "react-router-dom";

function WeatherDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, value, unit } = location.state || {};

  return (
    <div className="details-page">
      <h2>{title} Details</h2>
      <p> {value} {unit} </p>
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
}

export default WeatherDetailsPage;
