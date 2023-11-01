import { Types } from "mongoose";
import { AuthPayload } from "./auth.type";
import { PartialBy } from "./common.type";

export type UserAccountStatus = "ACTIVE" | "DEACTIVE" | "BANNED";
export type UserRole = "ADMIN" | "EDITOR" | "AUTHOR" | "USER";

export interface IUser {
  _id: typeof Types.ObjectId;
  name: string;
  email: string;
  avatar: string;
  accountStatus: UserAccountStatus;
  roles: UserRole[];
  createdAt: number;
  updatedAt: number;
  googleId: string | null;
  githubId: string | null;
}

export interface IUserMethods {
  generateAuthToken(): { token: string; payload: AuthPayload };
}

// SERVICE types
export type UserCreate = PartialBy<
  Pick<IUser, "name" | "email" | "avatar" | "googleId" | "githubId">,
  "googleId" | "githubId"
>;
