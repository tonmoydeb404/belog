import { AuthLogin } from "../types/auth.type";
import * as userService from "./user.service";

export const login = async (data: AuthLogin) => {
  try {
    let user;
    if ("username" in data && data.username) {
      user = await userService
        .getOne("username", data.username)
        .select("+password");
    } else if ("email" in data && data.email) {
      user = await userService.getOne("email", data.email).select("+password");
    }

    // make sure user account is available
    if (!user) throw new Error("User not found");

    // make sure password is matched
    const isMatch = await user.matchPassword(data.password);
    if (!isMatch) throw new Error("Password not matched");

    // generate a auth token
    const { payload, token } = user.generateAuthToken();

    return { payload, token, user };
  } catch (error) {
    console.log(error?.message);
    return null;
  }
};
