import config from "@config";
import { Sequelize } from "sequelize";

import databaseConfig from "./config";
import models from "./models";

const sequelize = new Sequelize(databaseConfig);

export const initializeDatabase = async () => {
  console.log(`Connecting to API ${config.environment} database...`);
  try {
    await sequelize.authenticate();
    console.log("Connected to API database.");

    Object.values(models).forEach((model) => model.initialize(sequelize));
    Object.values(models).forEach((model) => model.initializeAssociations());
    console.log("Initialized sequelize models.");
  } catch (error) {
    console.error("Unable to connect to the API database:", error);
  }
};

export * from "./models";

export default sequelize;
