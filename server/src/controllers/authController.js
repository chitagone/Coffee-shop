import UserModel from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "22910707";
const test = async (req, res) => {
  res.json("testing is working just fine");
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if name was entered
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }

    // Check password is good
    if (!password || password.length < 6) {
      return res.json({
        error: "password is required and should be at least 6 characters long ",
      });
    }

    // cheack email

    // is email is in database if true email that found in our database
    const exist = await UserModel.findOne({ email });

    if (exist) {
      return res.json({
        error: "Email is taken already",
      });
    }
    const hashPasswords = await hashPassword(password);

    // create a user
    const user = await UserModel.create({
      name,
      email,
      password: hashPasswords,
    });

    return res.json(UserModel);
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    // Check if user exits

    if (!user) {
      return res.json({
        error: "NO user found",
      });
    }

    // check if password match

    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, user: user.name },
        JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            console.error("JWT Signing Error:", err);
            return res.status(500).json({ error: "Internal server error" });
          }
          res
            .cookie("token", token, { httpOnly: true, sameSite: "Lax" })
            .json(user);
        }
      );
    } else {
      res.json({ error: "Passwords do not match" });
    }
    if (!match) {
      res.json({
        error: "passwords do not match",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const listUser = async (req, res) => {
  try {
    const allUser = await UserModel.find({});
    res.json({
      success: true,
      user: allUser,
    });
  } catch (error) {
    res.json({
      success: false,
    });
  }
};

const removeUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "User has been remove" });
  } catch (error) {
    res.json({
      success: false,
    });
  }
};
export { test, registerUser, loginUser, listUser, removeUser };
