import weatherFetch from "../services/weather.service.js";
import errorHandler from "../utils/errorhandler.js";
import responseSuccess from "../utils/responsesuccess.js";

const getWeather = async (req, res) => {
  try {
    const { query } = req.validateQuery.data;
    if (!query) {
      return errorHandler("Location parameter is missing", req, res);
    }
    const weatherData = await weatherFetch(query);
    if (weatherData.error) {
      return errorHandler(weatherData.error.message, req, res, 404);
    }

    return responseSuccess(weatherData, req, res);
  } catch (error) {
    return errorHandler(error.message, req, res, 500);
  }
};

export default getWeather;
