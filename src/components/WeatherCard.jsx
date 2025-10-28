import { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import clearIcon from "/icons/clear.png";
import partlyCloudyIcon from "/icons/partly_cloudy.png";
import cloudyIcon from "/icons/cloudy.png";
import rainIcon from "/icons/rain.png";
import snowIcon from "/icons/snow.png";
import thunderIcon from "/icons/thunderstorm.png";
import fogIcon from "/icons/fog.png";
import defaultIcon from "/icons/clear.png";

// 🌤️ Map weather codes to icon and label
const getWeatherInfo = (code) => {
  if (code === 0) return { icon: clearIcon, label: "Clear Sky" };
  if (code >= 1 && code <= 2) return { icon: partlyCloudyIcon, label: "Partly Cloudy" };
  if (code >= 3 && code <= 45) return { icon: cloudyIcon, label: "Cloudy" };
  if (code >= 48 && code <= 57) return { icon: fogIcon, label: "Foggy" };
  if (code >= 51 && code <= 67) return { icon: rainIcon, label: "Rainy" };
  if (code >= 71 && code <= 77) return { icon: snowIcon, label: "Snowy" };
  if (code >= 80 && code <= 82) return { icon: rainIcon, label: "Rain Showers" };
  if (code >= 95) return { icon: thunderIcon, label: "Thunderstorm" };
  return { icon: defaultIcon, label: "Unknown" };
};

const WeatherCard = ({ data }) => {
  const { current_weather, city } = data;
  const { icon, label } = getWeatherInfo(current_weather.weathercode);

  const feelsLike = Math.round(
    current_weather.temperature - current_weather.windspeed * 0.1
  );

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white/15 backdrop-blur-xl text-white shadow-2xl rounded-3xl p-5 sm:p-8 mx-auto animate-fadeIn transition-all duration-500 w-[90%] sm:w-full max-w-md">
      
      {/* Temperature + Icon */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 text-center sm:text-left">
        <div className="flex flex-col items-center sm:items-start space-y-2">
          <h2 className="text-5xl sm:text-6xl font-extrabold drop-shadow-md">
            {Math.round(current_weather.temperature)}°C
          </h2>
          <p className="text-sm sm:text-base text-white/90">
            Feels like <span className="font-semibold">{feelsLike}°C</span>
          </p>
          <p className="text-base sm:text-lg opacity-90 flex items-center">
            <MapPin className="inline w-4 h-4 sm:w-5 sm:h-5 mr-1 text-yellow-300" />
            <span className="bg-white/30 rounded-full px-2 ml-1">{city}</span>
          </p>
        </div>

        {/* Weather Icon + Label */}
        <div className="mt-4 sm:mt-0 flex flex-col items-center">
          <img
            src={icon}
            alt="Weather icon"
            className="w-20 sm:w-28 drop-shadow-lg object-contain"
          />
          <p className="mt-2 text-sm sm:text-base font-medium text-white/90 capitalize">
            {label}
          </p>
        </div>
      </div>

      {/* Time & Date */}
      <div className="text-center mb-6 sm:mb-8">
        <p className="text-base sm:text-lg font-semibold flex justify-center items-center gap-1">
          <Clock className="text-yellow-300" size={16} /> {currentTime.toLocaleTimeString()}
        </p>
        <p className="text-xs sm:text-sm opacity-80 flex justify-center items-center gap-1 mt-1">
          <CalendarDays className="text-yellow-300" size={16} /> {currentTime.toDateString()}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
