import User from "../models/auth.js";
import jwt from "jsonwebtoken";

export const signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered",
      });

    const { username, email, password } = req.body;
    const _user = new User({
      username,
      email,
      password,
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: error.message,
        });
      }

      if (data) {
        return res.status(201).json({
          message: "User created Succesfuly",
        });
      }
    });
  });
};

export const signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password) && user.role === "user") {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        const { _id, username, email, role } = user;
        res.status(200).json({
          token,
          user: { _id, username, email, role },
        });
      } else {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};
