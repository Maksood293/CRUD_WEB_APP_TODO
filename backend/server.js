import express from "express";
import connectDB from "./db/connectdb.js";
import todoRouter from "./routers/todoRouter.js";
import cors from "cors";
import userRouter from "./routers/userRouter.js";

const app = express();
app.use(cors());
const port = process.env.PORT || "8000"; //api port
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017"; //database port

//db connection
connectDB(DATABASE_URL);
app.use(express.json());

//routers
app.use("/todo", todoRouter);
app.use("/api", userRouter);

//app listen port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
