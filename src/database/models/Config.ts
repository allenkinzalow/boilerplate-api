import { CreationOptional, DataTypes, Sequelize } from "sequelize";

import { InitializableModel } from "./types";

class Config extends InitializableModel<Config> {
  declare administrators_enabled: boolean;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly id: CreationOptional<number>;
  declare readonly updatedAt: CreationOptional<Date>;

  static initialize(sequelize: Sequelize) {
    Config.init(
      {
        administrators_enabled: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        /* Auto-generated */
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: "Config",
        sequelize,
      }
    );
  }
}

export default Config;
