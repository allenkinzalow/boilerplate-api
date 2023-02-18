import { Administrator } from "@database";
import { ErrorResponse } from "@types";

export type TokenResponse = {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};

export type LoginResponse =
  | ErrorResponse
  | {
      token: TokenResponse;
      admin: Administrator;
    };

export type LoginPayload = {
  email: string;
  password: string;
};

export type RefreshResponse = ErrorResponse | TokenResponse;

export type RefreshPayload = {
  refreshToken: string;
};

export type LogoutPayload = {
  refreshToken: string;
  clearSessions: boolean;
};

export type LogoutResponse = ErrorResponse | {};
