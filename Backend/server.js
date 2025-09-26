import weatherApp from "./weather.app.js";
import config from "./config/env.js";

weatherApp.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
