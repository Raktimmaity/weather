import { useEffect, useState } from "react";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";
import axios from "axios";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [bgClass, setBgClass] = useState("bg-blue-900");

  // Detect location when app loads
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await fetchWeatherByCoords(latitude, longitude);
        },
        () => {
          setError("Location access denied. Please search manually.");
        }
      );
    } else {
      setError("Geolocation not supported by this browser.");
    }
  }, []);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError("");

      // ✅ FIXED: use correct variable names (lat, lon)
      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m&daily=temperature_2m_max&timezone=auto`
      );

      // ✅ Use BigDataCloud reverse-geocoding (CORS-safe)
      const geoRes = await axios.get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );

      const city = geoRes.data.city || geoRes.data.locality || "Your Location";

      const data = { city, ...res.data };
      setWeatherData(data);
      updateBackground(data.current_weather.weathercode);
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  const updateBackground = (code) => {
    if (code >= 0 && code <= 2)
      setBgClass("bg-gradient-to-br from-blue-400 to-blue-700");
    else if (code >= 3 && code <= 45)
      setBgClass("bg-gradient-to-br from-gray-500 to-gray-700");
    else if (code >= 51 && code <= 67)
      setBgClass("bg-gradient-to-br from-blue-600 to-gray-700");
    else if (code >= 71 && code <= 77)
      setBgClass("bg-gradient-to-br from-sky-100 to-sky-400");
    else if (code >= 95)
      setBgClass("bg-gradient-to-br from-yellow-500 to-orange-700");
    else setBgClass("bg-gradient-to-br from-blue-500 to-blue-800");
  };

  return (
  <div
    className={`relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden text-center transition-all duration-700 ${bgClass}`}
  >
    {/* Cloud animation */}
    <div className="cloud w-64 h-64 top-20 left-10 blur-3xl absolute opacity-40"></div>
    <div className="cloud w-80 h-80 top-40 right-10 blur-2xl absolute opacity-50"></div>

    <div className="z-10 px-4 sm:px-6 w-full max-w-md">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg tracking-wide">
        Weather Report
      </h1>

      <SearchBox
        setWeatherData={setWeatherData}
        setError={setError}
        setLoading={setLoading}
        updateBackground={updateBackground}
      />

      {loading && (
        <div className="flex justify-center items-center mt-8">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="ml-2">Loading...</p>
        </div>
      )}

      {error && <ErrorMessage message={error} />}
      {!loading && weatherData && <WeatherCard data={weatherData} />}
    </div>
  </div>
);

};

export default App;
