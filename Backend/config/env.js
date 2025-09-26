import dotenv from "dotenv";
dotenv.config();

const config = {
  API_KEY: process.env.WEATHER_API_KEY,
  PORT: process.env.PORT || 3001,
};

export default config;
