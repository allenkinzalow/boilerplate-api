import config from "@config";
import { Options } from "sequelize";

const postgresOptions: Options = {
  dialect: "postgres",
  define: {
    freezeTableName: true,
  },
  logging: false,
  pool: { max: 40, min: 2, acquire: 20000, idle: 5000 },
  retry: { max: 10 },
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  ...config.database,
};

const sqliteConfig: Options = {
  dialect: "sqlite",
  storage: `./.sqlite/${config.environment}.db`,
};

const databaseConfig: Options =
  config.environment === "development" || config.environment === "test"
    ? sqliteConfig
    : postgresOptions;

export default databaseConfig;
