import { DataTypes, QueryInterface } from "sequelize";

import { SessionScope } from "../models/Session";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable<any>("Session", {
      accessToken: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      expiresAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      scope: {
        defaultValue: "user",
        type: DataTypes.ENUM<SessionScope>("admin", "user"),
        allowNull: false,
      },
      refreshToken: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
        autoIncrement: false,
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      /* Auto-generated */
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable("Session");
  },
};
