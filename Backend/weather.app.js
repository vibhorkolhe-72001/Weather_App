import express from "express";
import cors from "cors";
import weatherRoute from "./routes/weather.route.js";

const weatherApp = express();
weatherApp.use(cors());
weatherApp.use(express.json());
weatherApp.use("/api", weatherRoute);

export default weatherApp;
