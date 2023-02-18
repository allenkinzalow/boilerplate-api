import "tsconfig-paths/register";

import sequelize, { initializeDatabase } from "../database";

beforeAll(async () => {
  await initializeDatabase();
});

afterAll(() => sequelize.close());
