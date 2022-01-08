import mongoose from "mongoose";

const connectDB = (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "mdkhan",
    };
    mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Database connected succesfully..");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
