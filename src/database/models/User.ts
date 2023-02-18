import bcrypt from "bcryptjs";
import {
  CreationOptional,
  DataTypes,
  FindAttributeOptions,
  Sequelize,
} from "sequelize";

import Administrator from "./Administrator";
import Session from "./Session";
import { InitializableModel } from "./types";

class User extends InitializableModel<User> {
  declare email: string;
  declare first_name: CreationOptional<string>;
  declare last_name: CreationOptional<string>;
  declare password: string;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date>;
  declare readonly id: CreationOptional<number>;
  declare readonly uuid: CreationOptional<string>;
  declare readonly updatedAt: CreationOptional<Date>;

  static serializations: {
    [key: string]: FindAttributeOptions;
  } = {
    public: { exclude: ["password"] },
  };

  static initialize(sequelize: Sequelize) {
    User.init(
      {
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
        uuid: {
          type: DataTypes.UUID,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
          unique: true,
        },
      },
      {
        paranoid: true,
        tableName: "User",
        sequelize,
        indexes: [
          {
            unique: true,
            fields: ["uuid"],
          },
          {
            unique: true,
            fields: ["email"],
          },
        ],
      }
    );
  }

  static initializeAssociations() {
    User.hasOne(Administrator, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
    User.hasMany(Session, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
  }

  static async register(email: string, password: string) {
    if (email && password) {
      const existing = await User.findOne({ where: { email } });
      if (!existing) {
        const hashedPassword = bcrypt.hashSync(password);
        return User.create({ email, password: hashedPassword });
      } else {
        throw new Error(`User already exists`);
      }
    }
  }

  async passwordMatches(password: string) {
    return bcrypt.compare(password, this.password);
  }

  async login(password: string): Promise<boolean> {
    return password && (await this.passwordMatches(password));
  }
}

export default User;
