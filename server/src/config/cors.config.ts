import { CorsOptions } from "cors";

const origins = ["http://localhost:5173", "http://localhost:4173"];

const corsConfig: CorsOptions = {
  credentials: true,
  optionsSuccessStatus: 200,
  origin: (requestOrigin, callback) => {
    if (!requestOrigin || origins.includes(requestOrigin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

export default corsConfig;
