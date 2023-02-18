module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./.sqlite/development.db",
    seederStorage: "sequelize",
  },
  test: {
    dialect: "sqlite",
    storage: "./.sqlite/test.db",
  },
  stage: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    protocol: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    protocol: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
