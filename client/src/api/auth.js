import { api } from "./client";

export const authApi = {
  register(payload) {
    return api.post("/api/auth/register", payload);
  },

  login(payload) {
    return api.post("/api/auth/login", payload);
  },

  refresh() {
    return api.post("/api/auth/refresh");
  },

  logout() {
    return api.post("/api/auth/logout");
  }
};
