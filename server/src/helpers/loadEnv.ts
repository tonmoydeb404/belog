import { config } from "dotenv";

config({ path: ".env.example" });
config({ path: ".env.local", override: true });

export default {
  NODE_ENV: process.env.NODE_ENV,

  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,

  JWT_SECRET: process.env.JWT_SECRET,

  SESSION_SECRET: process.env.SESSION_SECRET,
  CLIENT_AUTH_REDIRECT: process.env.CLIENT_AUTH_REDIRECT,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,

  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
};
