import { Schema, model } from "mongoose";
import { authExpire } from "../config/token-expire";
import { getAuthPayload } from "../helpers/authPayload";
import {
  IUser,
  IUserMethods,
  UserAccountStatus,
  UserRole,
} from "../types/user.type";
import { generateToken } from "../utils/token";

const userRoles: UserRole[] = ["ADMIN", "EDITOR", "AUTHOR", "USER"];
const userStatuses: UserAccountStatus[] = ["ACTIVE", "DEACTIVE", "BANNED"];

const userSchema = new Schema<IUser, {}, IUserMethods>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: function () {
        return `https://api.dicebear.com/7.x/thumbs/svg?seed=${this._id}`;
      },
    },
    accountStatus: {
      type: String,
      enum: userStatuses,
      required: true,
      default: "ACTIVE",
    },
    roles: {
      type: [
        {
          type: String,
          enum: userRoles,
        },
      ],
      default: ["USER"],
      required: true,
    },
    githubId: {
      type: String,
      default: null,
    },
    googleId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// generate token for authentication
userSchema.methods.generateAuthToken = function () {
  const payload = getAuthPayload(this);
  const token = generateToken(payload, authExpire, this.password);
  return { token, payload };
};

const User = model("user", userSchema);

export default User;
