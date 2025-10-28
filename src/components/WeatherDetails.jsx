const WeatherDetails = ({ data }) => {
  const hourly = data.hourly.temperature_2m.slice(0, 5);
  const times = data.hourly.time.slice(0, 5);

  return (
    <div className="mt-4">
      <div className="flex flex-wrap justify-center gap-3 text-xs sm:text-sm text-white/90">
        {hourly.map((temp, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-white/10 p-2 sm:p-3 rounded-xl backdrop-blur-md w-[60px] sm:w-[70px] hover:bg-white/20 transition-all"
          >
            <p className="font-semibold text-[11px] sm:text-sm">
              {new Date(times[i]).getHours()}:00
            </p>
            <p className="text-[13px] sm:text-base">{Math.round(temp)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;
