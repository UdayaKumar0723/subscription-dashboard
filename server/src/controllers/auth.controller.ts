import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { clearRefreshTokenCookie, refreshCookieName, setRefreshTokenCookie } from "../utils/cookies";
import { sendSuccess } from "../utils/apiResponse";

export const authController = {
  async register(req: Request, res: Response) {
    const result = await authService.register(req.body);
    setRefreshTokenCookie(res, result.refreshToken);

    sendSuccess(res, 201, "Registered successfully", {
      user: result.user,
      accessToken: result.accessToken
    });
  },

  async login(req: Request, res: Response) {
    const result = await authService.login(req.body);
    setRefreshTokenCookie(res, result.refreshToken);

    sendSuccess(res, 200, "Logged in successfully", {
      user: result.user,
      accessToken: result.accessToken
    });
  },

  async refresh(req: Request, res: Response) {
    const result = await authService.refresh(req.cookies?.[refreshCookieName]);
    setRefreshTokenCookie(res, result.refreshToken);

    sendSuccess(res, 200, "Token refreshed successfully", {
      accessToken: result.accessToken
    });
  },

  async logout(_req: Request, res: Response) {
    clearRefreshTokenCookie(res);
    sendSuccess(res, 200, "Logged out successfully");
  }
};
