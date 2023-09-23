import { AuthPayload } from "../types/auth.type";
import { IUser } from "../types/user.type";

export const getAuthPayload = (user: IUser): AuthPayload => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    emailVerified: user.emailVerified,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };
};
