import { Schema, model } from "mongoose";
import { sluggerPlugin } from "mongoose-slugger-plugin";
import {
  IUser,
  IUserMethods,
  UserAccountStatus,
  UserRole,
} from "../types/user.type";
import { compareHash, generateHash } from "../utils/hash";
import { generateToken } from "../utils/token";

const userRoles: UserRole[] = ["ADMIN", "EDITOR", "AUTHOR"];
const userStatuses: UserAccountStatus[] = ["ACTIVE", "DEACTIVE", "BANNED"];

const userSchema = new Schema<IUser, {}, IUserMethods>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: true,
      select: false,
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
      default: ["AUTHOR"],
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform(_doc, user, _options) {
        delete user.password;
        return user;
      },
    },
  }
);

// create index for username
userSchema.index({ username: 1 }, { name: "user_username", unique: true });
// config auto username generator
userSchema.plugin(sluggerPlugin, {
  slugPath: "username",
  generateFrom: ["firstName", "lastName"],
  index: "user_username",
});

// password hashing on save
userSchema.pre("save", async function (next) {
  // avoid hashing if password is not modified
  if (!this.isModified("password")) return next();
  // continue hashing
  const hashedPassword = await generateHash(this.password);
  this.password = hashedPassword;
});

// password hash on update
userSchema.pre("findOneAndUpdate", async function () {
  const data: Record<string, any> = this.getUpdate();

  if (data?.password) {
    // if password is updated then hash it again
    const hashedPassword = await generateHash(data.password);
    data.password = hashedPassword;
  }
});

// match hash password with string password
userSchema.methods.matchPassword = function (password) {
  return compareHash(password, this.password);
};

// generate token for authentication
userSchema.methods.generateAuthToken = async function () {
  // TODO:COMPLETE Payload
  const token = generateToken({}, "1d", this.password);
  return { token };
};

// generate token for email verification
userSchema.methods.generateEmailVerifyToken = async function () {
  // TODO:COMPLETE Payload
  const token = generateToken({}, "1h");
  return { token };
};

// generate token for password reset
userSchema.methods.generatePasswordResetToken = async function () {
  // TODO:COMPLETE Payload
  const token = generateToken({}, "1h", this.password);
  return { token };
};

const User = model("user", userSchema);

export default User;
