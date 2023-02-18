import bcrypt from "bcryptjs";
import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import { Permissions } from "../../types";

module.exports = {
  async up(queryInterface: QueryInterface) {
    const hashedPassword = bcrypt.hashSync("test");
    await queryInterface.bulkInsert("User", [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "testing@testing.io",
        password: hashedPassword,
        uuid: uuidv4(),
      },
    ]);
    const users = await queryInterface.sequelize.query(
      `SELECT id from User where email='testing@testing.io';`
    );

    const adminUser = users[0];
    await queryInterface.bulkInsert(
      "Administrator",
      [
        {
          // @ts-ignore
          userId: adminUser[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
          permissions: JSON.stringify({ administrators: Permissions.DELETE }),
        },
      ],
      {}
    );
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("Administrator", null, {});
    await queryInterface.bulkDelete("User", null, {});
  },
};
