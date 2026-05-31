import jwt, { SignOptions } from "jsonwebtoken";
import { Types } from "mongoose";
import { env } from "../config/env";

export type TokenPayload = {
  userId: string;
  role: "admin" | "user";
};

export const signAccessToken = (payload: TokenPayload) => {
  return jwt.sign(payload, env.jwtAccessSecret, {
    expiresIn: env.accessTokenExpiresIn
  } as SignOptions);
};

export const signRefreshToken = (payload: TokenPayload) => {
  return jwt.sign(payload, env.jwtRefreshSecret, {
    expiresIn: env.refreshTokenExpiresIn
  } as SignOptions);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.jwtAccessSecret) as TokenPayload;
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.jwtRefreshSecret) as TokenPayload;
};

export const toObjectId = (id: string) => new Types.ObjectId(id);
