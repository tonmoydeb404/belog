import express from "express";
import passportConfig from "../config/passport.config";
import { defaultError, notFoundError } from "./errors";
import middlewares from "./middlewares";
import router from "./router";

const app = express();

// use middlewares
app.use(middlewares);

// configure passport authentication
passportConfig();

// use router
app.use(router);
// handle errors
app.use(notFoundError);
app.use(defaultError);

export default app;
