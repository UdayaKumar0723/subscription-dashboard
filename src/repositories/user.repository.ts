import { User, UserRole } from "../models/User";

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
};

export const userRepository = {
  create(input: CreateUserInput) {
    return User.create(input);
  },

  findByEmail(email: string, includePassword = false) {
    const query = User.findOne({ email: email.toLowerCase() });
    return includePassword ? query.select("+password") : query;
  },

  findById(id: string) {
    return User.findById(id);
  }
};
