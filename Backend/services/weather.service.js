import fetch from "node-fetch";
import config from "../config/env.js";

const weatherFetch = async (location) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=${
    config.API_KEY
  }&q=${encodeURIComponent(location)}&aqi=no`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 5000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (error) {
        throw new Error(
          `Weather API error: ${response.status} ${response.statusText}`
        );
      }
      if (errorData?.error?.message?.includes("No matching location found")) {
        return { notFound: true, message: errorData.error.message };
      }
      throw new Error(
        `Weather API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (
      data.error &&
      data.error.message.includes("No matching location found")
    ) {
      return { notFound: true, message: data.error.message };
    }

    if (data.error) {
      throw new Error(data.error.message);
    }

    return data;
  } catch (err) {
    return {
      error: { message: err.message || "Failed to fetch weather data" },
    };
  }
};

export default weatherFetch;
