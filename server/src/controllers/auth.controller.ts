import createHttpError from "http-errors";
import passport, { AuthenticateOptions } from "passport";
import apiResponse from "../helpers/apiResponse";
import asyncWrapper from "../helpers/asyncWrapper";
import loadEnv from "../helpers/loadEnv";

export const getLogout = asyncWrapper(async (req, res) => {
  req.logOut({ keepSessionInfo: false }, (err) => {
    if (err) return console.log(err);

    // remove credantials from cookies
    // res.clearCookie("token");
    // res.cookie("logged_in", false, authCookie);

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
  // refresh session
  req.session.touch();

  // send refreshed cookies to the response
  res.cookie("belog", req.cookies.belog, {
    expires: new Date(Date.now() + req.session.cookie.maxAge),
    httpOnly: true,
  });

  res.status(200).json(
    apiResponse({
      message: "Auth refreshed.",
      statusCode: 200,
      results: { user: req.user },
    })
  );
});

export const getResult = asyncWrapper(async (req, res) => {
  if (req.isAuthenticated()) {
    // Continue login success from here
    res.status(200).json(
      apiResponse({
        status: "SUCCESS",
        results: {
          user: req.user,
        },
        message: "Authentication successfull",
      })
    );
  } else {
    // continue login failed from here
    const errors = req.flash("error");
    throw createHttpError(403, errors[0] || "Authentication failed");
  }
});

export const getOauth = (auth: string, options: AuthenticateOptions) =>
  asyncWrapper(async (req, res, next) => {
    // prepare state for authentication
    const state = Buffer.from(
      JSON.stringify({ goTo: req.query?.goTo })
    ).toString("base64");

    const authenticator = passport.authenticate(auth, {
      ...options,
      state,
    });

    return authenticator(req, res, next);
  });

export const getOauthCallback = (auth: string, options: AuthenticateOptions) =>
  asyncWrapper(async (req, res, next) => {
    const { state } = req.query;
    const { goTo } = JSON.parse(
      Buffer.from(state as string, "base64").toString()
    );

    let redirectURL = loadEnv.CLIENT_AUTH_REDIRECT + "?";
    if (goTo) redirectURL += `&goTo=${goTo}`;

    const authenticator = passport.authenticate(auth, {
      ...options,
      failureFlash: true,
      failureRedirect: `${redirectURL}&auth=failed`,
      successRedirect: `${redirectURL}&auth=success`,
    });

    return authenticator(req, res, next);
  });
