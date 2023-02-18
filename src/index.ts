import config from "./config/dotenv";
import app from "./config/express";
import { initializeDatabase } from "./database";

const startApp = () => {
  if (config.environment !== "test") {
    app.listen(config.port, () => {
      console.log(
        `Running API on port ${config.port} in ${config.environment}.`
      );
    });
  }
};

const setupDatabase = async () => {
  await initializeDatabase();

  startApp();
};

if (config.environment !== "test") {
  setupDatabase();
} else {
  startApp();
}

export default app;
