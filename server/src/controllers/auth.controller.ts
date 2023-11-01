import { authCookie, authCookieHTTP } from "../config/cookie-options";
import apiResponse from "../helpers/apiResponse";
import asyncWrapper from "../helpers/asyncWrapper";
import * as userService from "../services/user.service";

export const getCallback = asyncWrapper(async (req, res) => {
  const token = req.authInfo;
  const payload = req.user;

  // add credantials in cookies
  res.cookie("token", token, authCookieHTTP);
  res.cookie("logged_in", true, authCookie);

  res.status(200).json(
    apiResponse({
      message: "Successfully logged in.",
      statusCode: 200,
      results: { payload, token },
    })
  );
});

export const getLogout = asyncWrapper(async (req, res) => {
  req.logOut({ keepSessionInfo: false }, (err) => {
    if (err) console.log(err);

    // remove credantials from cookies
    res.clearCookie("token");
    res.cookie("logged_in", false, authCookie);

    res.status(200).json(
      apiResponse({
        message: "Logged out successfully",
        statusCode: 200,
        status: "SUCCESS",
        results: {},
      })
    );
  });
});

export const getRefresh = asyncWrapper(async (req, res) => {
  const user = await userService.getOne("_id", req.user._id);

  const { token, payload } = user.generateAuthToken();

  // add credantials in cookies
  res.cookie("token", token, authCookieHTTP);
  res.cookie("logged_in", true, authCookie);

  res.status(200).json(
    apiResponse({
      message: "Auth token refreshed.",
      statusCode: 200,
      results: { payload, token },
    })
  );
});
