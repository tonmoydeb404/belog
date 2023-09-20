import { connect } from "mongoose";

export const connectDB = async (uri: string) => {
  try {
    await connect(uri);
    console.log(`Database connected successfully.`);
  } catch (error) {
    console.log(`Database connection failed.`);
    throw error;
  }
};
