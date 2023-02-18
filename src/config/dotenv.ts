import * as dotenv from "dotenv";

dotenv.config();

export type Environment = "test" | "development" | "stage" | "production";

export type MemberApiConfig = {
  database: {
    database: string;
    host: string;
    password: string;
    username: string;
    port: number;
  };
  environment: Environment;
  jwtExpirationInterval: number;
  jwtSecret: string;
  port: number;
};

const config: MemberApiConfig = {
  database: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT),
  },
  environment: process.env.NODE_ENV as Environment,
  jwtExpirationInterval: parseInt(process.env.JWT_EXPIRATION_INTERVAL),
  jwtSecret: process.env.JWT_SECRET,
  port: parseInt(process.env.PORT),
};

export default config;
