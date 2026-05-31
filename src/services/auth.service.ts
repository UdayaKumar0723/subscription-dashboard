import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/user.repository";
import { ApiError } from "../utils/apiError";
import { signAccessToken, signRefreshToken, TokenPayload, verifyRefreshToken } from "../utils/tokens";

const sanitizeUser = (user: { _id: unknown; name: string; email: string; role: "admin" | "user" }) => ({
  id: String(user._id),
  name: user.name,
  email: user.email,
  role: user.role
});

const createTokenPair = (payload: TokenPayload) => ({
  accessToken: signAccessToken(payload),
  refreshToken: signRefreshToken(payload)
});

export const authService = {
  async register(input: { name: string; email: string; password: string }) {
    const existingUser = await userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new ApiError(409, "Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = await userRepository.create({
      ...input,
      email: input.email.toLowerCase(),
      password: hashedPassword,
      role: "user"
    });

    const payload = { userId: String(user._id), role: user.role };
    const tokens = createTokenPair(payload);

    return {
      user: sanitizeUser(user),
      ...tokens
    };
  },

  async login(input: { email: string; password: string }) {
    const user = await userRepository.findByEmail(input.email, true);
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    const payload = { userId: String(user._id), role: user.role };
    const tokens = createTokenPair(payload);

    return {
      user: sanitizeUser(user),
      ...tokens
    };
  },

  async refresh(refreshToken: string | undefined) {
    if (!refreshToken) {
      throw new ApiError(401, "Refresh token is required");
    }

    try {
      const payload = verifyRefreshToken(refreshToken);
      const user = await userRepository.findById(payload.userId);

      if (!user) {
        throw new ApiError(401, "Invalid refresh token");
      }

      const tokenPayload = { userId: String(user._id), role: user.role };
      return createTokenPair(tokenPayload);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(401, "Invalid or expired refresh token");
    }
  }
};
