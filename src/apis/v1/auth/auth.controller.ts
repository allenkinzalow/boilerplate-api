import Config from "@config";
import { Administrator, Session } from "@database";
import { RequestHandler } from "express";
import moment from "moment";

import { getBearerToken } from "../../../utils/headers.utils";
import {
  LoginPayload,
  LoginResponse,
  LogoutPayload,
  LogoutResponse,
  RefreshPayload,
  RefreshResponse,
  TokenResponse,
} from "./auth.types";

const generateTokenResponse = (session: Session): TokenResponse => {
  const expiresAt = moment(new Date())
    .add(Config.jwtExpirationInterval, "minutes")
    .toDate()
    .getTime();
  return {
    tokenType: "Bearer",
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
    expiresAt,
  };
};

/**
 * POST api/v1/auth/login
 * Payload: { email: string, password: string }
 */
const login: RequestHandler<{}, LoginResponse, LoginPayload> = async (
  req,
  res
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        error: {
          title: "Invalid Request",
          description: "Email and password are required.",
          status: 400,
        },
      });
      return;
    }

    const admin = await Administrator.findOne({
      include: { association: "user", required: true, where: { email } },
    });
    if (!admin) {
      res.status(401).json({
        error: {
          title: "Invalid",
          description: "Invalid email or password.",
          status: 401,
        },
      });
      return;
    }

    const login = await admin.user.login(password);
    if (login) {
      const session = await Session.generateAdmin(admin);
      const tokenResponse = generateTokenResponse(session);
      res.status(200).json({ token: tokenResponse, admin });
    } else {
      res.status(401).json({
        error: {
          title: "Invalid",
          description: "Invalid email or password.",
          status: 401,
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        title: "Unexpected Error",
        description: "An unexpected error occured. Please try again.",
        status: 500,
      },
    });
  }
};

/**
 * POST api/v1/auth/refresh
 */
const refresh: RequestHandler<{}, RefreshResponse, RefreshPayload> = async (
  req,
  res
) => {
  try {
    const accessToken = getBearerToken(req);
    if (!accessToken) {
      res.status(401).json({
        error: {
          title: "Unauthorized",
          description: "Please log in and try again.",
          status: 401,
        },
      });
      return;
    }
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).json({
        error: {
          title: "Invalid Request",
          description: "Refresh token is required.",
          status: 400,
        },
      });
      return;
    }

    const session = await Session.findOne({
      include: [Session.associations.user],
      where: {
        scope: "admin",
        refreshToken,
      },
    });
    if (!session) {
      res.status(401).json({
        error: {
          title: "Unauthorized",
          description: "Please log in and try again.",
          status: 401,
        },
      });
      return;
    }

    if (
      session.accessToken !== accessToken ||
      session.expiresAt.getTime() < new Date().getTime()
    ) {
      await session.destroy();
      res.status(401).json({
        error: {
          title: "Session Expired",
          description: "Your session has expired. Please log in again.",
          status: 401,
        },
      });
      return;
    }

    const admin = await Administrator.findOne({
      where: { userId: session.userId },
    });
    if (!admin) {
      res.status(403).json({
        error: {
          title: "Permission Denied",
          description: "This account is not an administrator.",
          status: 403,
        },
      });
      return;
    }

    await session.update({
      accessToken: Session.generateAccessToken(admin.id),
    });
    res.json(generateTokenResponse(session));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        title: "Unexpected Error",
        description: "An unexpected error occured. Please try again.",
        status: 500,
      },
    });
  }
};

/**
 * POST api/v1/auth/logout
 */
const logout: RequestHandler<{}, LogoutResponse, LogoutPayload> = async (
  req,
  res
) => {
  try {
    const accessToken = getBearerToken(req);
    if (!accessToken) {
      res.status(400).json({
        error: {
          title: "Invalid Request",
          description: "Refresh token is required.",
          status: 400,
        },
      });
      return;
    }
    await Session.destroy({ where: { accessToken } });
    res.status(200).json({});
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        title: "Unexpected Error",
        description: "An unexpected error occured. Please try again.",
        status: 500,
      },
    });
  }
};

export { login, logout, refresh };
