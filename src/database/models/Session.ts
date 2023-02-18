import Config from "@config";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import moment from "moment";
import {
  Association,
  CreationOptional,
  DataTypes,
  ForeignKey,
  NonAttribute,
  Sequelize,
} from "sequelize";

import Administrator from "./Administrator";
import { InitializableModel } from "./types";
import User from "./User";

export type SessionScope = "admin" | "user";

class Session extends InitializableModel<Session> {
  declare readonly accessToken: string;
  declare readonly expiresAt: Date;
  declare readonly scope: SessionScope;
  declare readonly refreshToken: string;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly userId: ForeignKey<User["id"]>;

  declare user?: NonAttribute<User>;

  declare static associations: {
    user: Association<Session, User>;
  };

  static initialize(sequelize: Sequelize) {
    Session.init(
      {
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
      },
      {
        tableName: "Session",
        sequelize,
      }
    );
  }

  static initializeAssociations() {
    Session.belongsTo(User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      as: "user",
    });
  }

  /**
   * Create a new session and generate a refresh token.
   * @param user The user to generate the session for.
   * @param scope The scope of the API the User has a session for.
   * @returns  The session
   */
  static async generateUser(user: User): Promise<Session> {
    const refreshToken = `${user.uuid}.${crypto
      .randomBytes(40)
      .toString("hex")}`;
    const expiresAt = moment().add(30, "days").toDate();
    const session = await Session.create({
      accessToken: this.generateAccessToken(user.id),
      expiresAt,
      scope: "user",
      refreshToken,
      userId: user.id,
    });
    return session;
  }

  static async generateAdmin(admin: Administrator): Promise<Session> {
    const refreshToken = `${admin.user.uuid}.${crypto
      .randomBytes(40)
      .toString("hex")}`;
    const expiresAt = moment().add(30, "days").toDate();
    const session = await Session.create({
      accessToken: this.generateAccessToken(admin.id),
      expiresAt,
      scope: "admin",
      refreshToken,
      userId: admin.user.id,
    });
    return session;
  }

  /**
   * Generate an access token that expires in {Config.jwtExpirationInterval} minutes.
   */
  static generateAccessToken(id: number) {
    const payload = {
      exp: moment()
        .add(Config.jwtExpirationInterval, "minutes")
        .toDate()
        .getTime(),
      iat: moment().toDate().getTime(),
      sub: id,
    };
    return jwt.sign(payload, Config.jwtSecret);
  }
}

export default Session;
