import {
  Association,
  CreationOptional,
  DataTypes,
  ForeignKey,
  NonAttribute,
  Sequelize,
} from "sequelize";

import { Permissions } from "../../types";
import { InitializableModel } from "./types";
import User from "./User";

export type AdministratorPermissions = {
  administrators: Permissions;
};

class Administrator extends InitializableModel<
  Administrator,
  { omit: "user" }
> {
  declare lastLoginDate: Date;
  declare permissions?: AdministratorPermissions;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date>;
  declare readonly id: CreationOptional<number>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly userId: ForeignKey<User["id"]>;

  declare user?: NonAttribute<User>;

  declare static associations: {
    user: Association<Administrator, User>;
  };

  static initialize(sequelize: Sequelize) {
    Administrator.init(
      {
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
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
        },
        createdAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        paranoid: true,
        tableName: "Administrator",
        sequelize,
        indexes: [
          {
            unique: true,
            fields: ["userId"],
          },
        ],
      }
    );
  }

  static initializeAssociations() {
    Administrator.belongsTo(User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      as: "user",
    });
  }

  hasPermissions(
    permission: keyof AdministratorPermissions,
    requiredValue: Permissions
  ): boolean {
    return this.permissions?.[permission] >= requiredValue ?? false;
  }
}

export default Administrator;
