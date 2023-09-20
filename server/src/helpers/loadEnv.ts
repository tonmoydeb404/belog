import { config } from "dotenv";

config({ path: ".env.example" });
config({ path: ".env.local", override: true });

export default {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
};
