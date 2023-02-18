const { pathsToModuleNameMapper } = require("ts-jest");

const { compilerOptions } = require("./tsconfig");

module.exports = {
  preset: "ts-jest",
  setupFiles: ["dotenv/config", "./src/test/jest.setup.ts"],
  setupFilesAfterEnv: ["./src/test/jest.database.ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"],
};
