import { AuthPayload } from "../types/auth.type";
import { IUser } from "../types/user.type";

export const getAuthPayload = (user: IUser): AuthPayload => {
  return {
    _id: user._id,
    name: user.name,
    avatar: user.avatar,
    email: user.email,
    githubId: user.githubId,
    googleId: user.googleId,
    roles: user.roles,
    accountStatus: user.accountStatus,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
