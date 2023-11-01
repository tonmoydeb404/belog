import cookieParser from "cookie-parser";
import { json } from "express";
import session from "express-session";
import morgan from "morgan";
import passport from "passport";
import loadEnv from "../helpers/loadEnv";

const middlewares = [
  morgan("dev"),
  json(),
  session({
    secret: loadEnv.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  }),
  passport.initialize(),
  passport.session(),
  cookieParser(),
];

export default middlewares;
