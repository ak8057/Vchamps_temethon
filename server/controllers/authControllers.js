import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "../utils/appError.js";

//!REGISTER USER
const signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return next(new createError("User already exists!", 400));
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    //!assign jwt token to user(json web token)
    const token = jwt.sign({ _id: newUser._id }, "secretkey123", {
      expiresIn: "90d",
    });

    res.status(201).json({
      status: "success",
      message: "User registered succesfully",
      token,
      user:{
        _id:newUser._id,
        name:newUser.name,
        email:newUser.email,
        role:newUser.role,
      }
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(new createError("User not found!", 404));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(new createError("invalid Email or Password", 401));
    }

     //!assign jwt token to user(json web token)
     const token = jwt.sign({ _id: user._id }, "secretkey123", {
      expiresIn: "90d",
    });

    res.status(200).json({
      status: "success",
      message: "User logged in succesfully",
      token,
      user:{
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
      }
    });
  } catch (error) {
    next(error);
  }
};

export default { signup, login };
