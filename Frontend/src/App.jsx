import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { motion } from "motion/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("Bhopal");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (location) => {
    const api_url = `http://192.168.1.12:5000/api/weather?query=${location}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(api_url, { signal: controller.signal });
      clearTimeout(timeout);

      if (response.status === 400)
        throw new Error(
          "Enter a valid location (only letters and spaces allowed)"
        );
      if (response.status === 404) throw new Error("Location not found");
      if (response.status >= 500)
        throw new Error("Server error. Please try again later.");

      const responseData = await response.json();

      if (responseData.status === 200 && responseData.success === false)
        throw new Error("API LINK EXPIRED OR INCORRECT");

      if (responseData.success === false)
        throw new Error(responseData.message || "Something went wrong");
      if (responseData.success === true && responseData.data?.notFound)
        throw new Error("Location not found");

      setWeatherData(responseData);
      setLocation("");
    } catch (error) {
      if (error.name === "AbortError") {
        setError("Request timed out. Please try again.");
      } else if (error.message === "Failed to fetch") {
        setError("Server down. Please check if the backend is running.");
      } else {
        setError(error.message);
      }
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const getLinkAndBackground = () => {
    if (!weatherData)
      return { link: "Default", bg: "from-blue-400 to-blue-700" };
    const condition = weatherData.data.current.condition.text.toLowerCase();
    if (condition.includes("rain") || condition.includes("light"))
      return { link: "Rainy", bg: "from-gray-600 to-blue-800" };
    if (condition.includes("mist"))
      return { link: "mist", bg: "from-gray-300 to-gray-600" };
    if (condition.includes("cloud"))
      return { link: "cloud", bg: "from-gray-400 to-gray-700" };
    if (condition.includes("clear"))
      return { link: "clear", bg: "from-indigo-900 to-blue-900" };
    if (condition.includes("sun"))
      return { link: "sun", bg: "from-yellow-300 to-orange-600" };
    if (condition.includes("snow"))
      return { link: "snow", bg: "from-white to-blue-200" };
    return { link: "Default", bg: "from-blue-400 to-blue-700" };
  };

  const { link, bg } = getLinkAndBackground();

  useEffect(() => {
    fetchWeather(location);
  }, []);

  if (loading) {
    return (
      <div className="absolute top-0 left-0 h-screen w-full bg-blue-300 flex justify-center items-center z-10">
        <ClipLoader
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full flex justify-center items-center p-2 bg-gradient-to-b ${bg} text-white transition duration-500`}
    >
      <div className="absolute h-full w-full z-1 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="size-[400px]"
        >
          <DotLottieReact src={`/${link}.lottie`} loop autoplay />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="size-[400px]"
        >
          <DotLottieReact src={`/${link}.lottie`} loop autoplay />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.2 }}
        className="h-[900px] w-[700px] border flex flex-col z-1 bg-gray-900 max-2xl:w-[600px] max-xl:w-[550px]"
      >
        {/* Search bar */}
        <div className="min-h-14 w-full border p-1 flex gap-2">
          <input
            type="text"
            className="h-full w-full border px-2 placeholder-white capitalize"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchWeather(location);
              }
            }}
            disabled={loading}
          />
          <button
            className="h-full border px-8"
            onClick={() => {
              fetchWeather(location);
            }}
            disabled={loading}
          >
            Go
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="min-h-12 w-full bg-red-100 text-red-700 flex justify-center items-center p-2 text-center">
            {error}
          </div>
        )}

        {weatherData && (
          <>
            {/* Location */}
            <div className="min-h-20 w-full border flex flex-col justify-center items-center">
              <h1 className="font-semibold">{weatherData?.data?.location?.name}</h1>
              <p>
                {weatherData?.data?.location?.region},{" "}
                {weatherData?.data?.location?.country}
              </p>
            </div>

            {/* Temperature */}
            <div className="min-h-52 w-full border flex flex-col justify-center items-center gap-2">
              <h1 className="text-8xl font-semibold">
                {weatherData?.data?.current?.temp_c}°C
              </h1>
              <p>{weatherData?.data?.current?.temp_f}°F</p>
            </div>

            {/* Condition */}
            <div className="min-h-20 w-full border flex justify-center items-center gap-2">
              {weatherData?.data?.current?.condition && (
                <img
                  src={weatherData?.data?.current?.condition?.icon}
                  alt={weatherData?.data?.current?.condition?.text}
                />
              )}

              <p className="font-semibold">{weatherData?.data?.current?.condition?.text}</p>
            </div>

            {/* Weather details grid */}
            <div className="h-full w-full grid grid-cols-2 grid-rows-4">
              <div className="border flex flex-col justify-center items-center">
                <h1 className="font-semibold">Feels Like</h1>
                <p>{weatherData?.data?.current?.feelslike_c}°C</p>
              </div>
              <div className="border flex flex-col justify-center items-center">
                <h1 className="font-semibold">Humidity</h1>
                <p>{weatherData?.data?.current?.humidity}%</p>
              </div>
              <div className="border flex flex-col justify-center items-center">
                <h1 className="font-semibold">Wind</h1>
                <p>
                  {weatherData?.data?.current?.wind_kph} kph{" "}
                  {weatherData?.data?.current?.wind_dir}
                </p>
              </div>
              <div className="border flex flex-col justify-center items-center">
                <h1 className="font-semibold">Pressure</h1>
                <p>{weatherData?.data?.current?.pressure_mb} mb</p>
              </div>
              <div className="border flex flex-col justify-center items-center">
                <h1 className="font-semibold">Visibility</h1>
                <p>{weatherData?.data?.current?.vis_km} km</p>
              </div>
              <div className="border flex flex-col justify-center items-center">
                <h1 className="font-semibold">UV Index</h1>
                <p>{weatherData?.data?.current?.uv}</p>
              </div>
              <div className="border flex flex-col justify-center items-center">
                <h1 className="font-semibold">Cloud</h1>
                <p>{weatherData?.data?.current?.cloud}%</p>
              </div>
              <div className="border flex flex-col justify-center items-center">
                <h1 className="font-semibold">Gust</h1>
                <p>{weatherData?.data?.current?.gust_kph} km/h</p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="min-h-14 w-full border flex justify-center items-center">
              <p>Last updated: {weatherData?.data?.current?.last_updated}</p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default App;
