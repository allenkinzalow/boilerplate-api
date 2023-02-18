import { DataTypes, QueryInterface } from "sequelize";

import { User } from "../models";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface
      .createTable<User>("User", {
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        first_name: {
          type: DataTypes.STRING,
        },
        last_name: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
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
        uuid: {
          type: DataTypes.UUID,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
          unique: true,
        },
      })
      .then(async () => {
        await queryInterface.addIndex("User", ["uuid"]);
        await queryInterface.addIndex("User", ["email"]);
      });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("User");
  },
};
