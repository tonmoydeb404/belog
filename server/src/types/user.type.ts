import { AuthPayload } from "./auth.type";
import { PartialBy } from "./common.type";

export type UserAccountStatus = "ACTIVE" | "DEACTIVE" | "BANNED";
export type UserRole = "ADMIN" | "EDITOR" | "AUTHOR";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  emailVerified: boolean;
  password: string;
  accountStatus: UserAccountStatus;
  roles: UserRole[];
  createdAt: number;
  updatedAt: number;
}

export interface IUserMethods {
  matchPassword(password: string): Promise<boolean>;
  generateAuthToken(): { token: string; payload: AuthPayload };
  generateEmailVerifyToken(): Promise<{ token: string }>;
  generatePasswordResetToken(): Promise<{ token: string }>;
}

// SERVICE types
export type UserCreate = PartialBy<
  Pick<IUser, "firstName" | "lastName" | "username" | "email" | "password">,
  "username"
>;
export type UserUpdate = Partial<
  Pick<IUser, "firstName" | "lastName" | "username" | "email" | "password">
>;
