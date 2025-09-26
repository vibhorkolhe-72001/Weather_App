import express from "express";
import { z } from "zod";
import getWeather from "../controllers/weather.controller.js";
import validateQuery from "../middleware/validate.js";

const weatherRoute = express.Router();
const querySchema = z.object({
  query: z
    .string()
    .min(2, "Query parameter cannot be empty")
    .regex(/^[a-zA-Z\s]+$/, "Query must contain only letters and spaces"),
});
weatherRoute.get("/weather", validateQuery(querySchema), getWeather);

export default weatherRoute;
