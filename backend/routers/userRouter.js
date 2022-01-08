import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import UserModala from "../modals/Users.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdUser = await UserModala.insertMany(data.users);
    res.send(createdUser);
  })
);

export default userRouter;

userRouter.post(
  "/registration",
  expressAsyncHandler(async (req, res) => {
    const user = new UserModala({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      token: generateToken(createdUser),
    });
  })
);

userRouter.post(
  "/singin",
  expressAsyncHandler(async (req, res) => {
    const user = await UserModala.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user), //to generateToken using user details
        });
      }
    }
    res.status(401).send({ message: "Invalid username or password" });
  })
);
