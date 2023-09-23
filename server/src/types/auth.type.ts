import { IUser } from "./user.type";

export type AuthPayload = Pick<
  IUser,
  | "firstName"
  | "lastName"
  | "email"
  | "emailVerified"
  | "accountStatus"
  | "roles"
  | "username"
>;

// LOGIN types
export type EmailLogin = {
  email: string;
  password: string;
};

export type UsernameLogin = {
  password: string;
  username: string;
};

export type AuthLogin = EmailLogin | UsernameLogin;
