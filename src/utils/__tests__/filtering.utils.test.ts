import { User } from "@database";
import { Op } from "sequelize";

import { filterRequest } from "../filtering.utils";

describe("filtering utils", () => {
  test("filterRequest", () => {
    const sequelizeFilter = filterRequest<User>({
      filter: {
        email: {
          eq: "test@test.com",
        },
      },
    });
    expect(sequelizeFilter).toEqual({
      email: {
        [Op.eq]: "test@test.com",
      },
    });
  });
});
