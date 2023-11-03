import cookieParser from "cookie-parser";
import cors from "cors";
import { json } from "express";

import session from "express-session";
import morgan from "morgan";
import passport from "passport";
import corsConfig from "../config/cors.config";
import loadEnv from "../helpers/loadEnv";

import flush from "connect-flash";

const middlewares = [
  cors(corsConfig),
  morgan("dev"),
  json(),
  session({
    name: "belog",
    secret: loadEnv.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  }),
  flush(),
  passport.initialize(),
  passport.session(),
  cookieParser(),
];

export default middlewares;
