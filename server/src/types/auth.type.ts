import { IUser } from "./user.type";

export type AuthPayload = Pick<
  IUser,
  | "_id"
  | "name"
  | "email"
  | "avatar"
  | "accountStatus"
  | "roles"
  | "githubId"
  | "googleId"
  | "createdAt"
  | "updatedAt"
>;
