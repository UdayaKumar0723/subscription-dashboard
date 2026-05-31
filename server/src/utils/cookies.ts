import { Response } from "express";
import { env } from "../config/env";

const refreshCookieName = "refreshToken";

export const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  res.cookie(refreshCookieName, refreshToken, {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: env.nodeEnv === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};

export const clearRefreshTokenCookie = (res: Response) => {
  res.clearCookie(refreshCookieName, {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: env.nodeEnv === "production" ? "none" : "lax"
  });
};

export { refreshCookieName };
