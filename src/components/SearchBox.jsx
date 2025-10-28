import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

const SearchBox = ({ setWeatherData, setError, setLoading, updateBackground }) => {
  const [city, setCity] = useState("");

  const handleSearch = async () => {
    try {
      setError("");
      if (!city.trim()) return setError("Please enter a city name");
      setLoading(true);

      const geoRes = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );
      if (!geoRes.data.results) return setError("City not found");

      const { latitude, longitude, name } = geoRes.data.results[0];
      const weatherRes = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m&daily=temperature_2m_max&timezone=auto`
      );

      const data = { city: name, ...weatherRes.data };
      setWeatherData(data);
      updateBackground(data.current_weather.weathercode);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle pressing Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Clear input text
  const clearInput = () => {
    setCity("");
  };

  return (
    <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 w-full sm:w-auto">
      <div className="relative w-64 sm:w-72">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
          className="px-4 py-2 w-full rounded-full bg-white/25 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 pr-10"
        />

        {/* ❌ Clear button */}
        {city && (
          <button
            onClick={clearInput}
            className="absolute right-3 top-2 text-white text-lg hover:text-yellow-400 transition-colors duration-200"
            aria-label="Clear search"
          >
            <X className="border rounded-full" />
          </button>
        )}
      </div>

      <button
        type="submit"
        onClick={handleSearch}
        className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
