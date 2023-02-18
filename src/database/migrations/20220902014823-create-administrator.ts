import { DataTypes, QueryInterface } from "sequelize";

import { Administrator } from "../models";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface
      .createTable<Administrator>("Administrator", {
        lastLoginDate: {
          type: DataTypes.DATE,
        },
        permissions: {
          type: DataTypes.JSON,
        },
        userId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          unique: true,
          references: {
            model: "User",
            key: "id",
          },
        },
        /* Auto-generated */
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
        },
        createdAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      })
      .then(async () => {
        await queryInterface.addIndex("Administrator", ["userId"]);
      });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("Administrator");
  },
};
