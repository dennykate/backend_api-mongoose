import mongoose from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const getUser = async (req, res) => {
  const { username, password, role } = req.body;
  const newPassword = crypto.createHash("md5").update(password).digest("hex");

  const user = { username, newPassword, role };

  try {
    const user = await User.find({
      username,
      password: newPassword,
      role,
    });

    if (user.length == 0) {
      return res.status(400).json({
        message: "Auth Fail",
      });
    }

    const { username: _username, password: _password, role: _role } = user[0];

    jwt.sign(
      { username: _username, password: _password, role: _role },
      process.env.NEXT_APP_ENV_SECRET,
      {
        expiresIn: "1h",
      },
      (err, data) => {
        if (err) {
          return res.status(400).json({
            message: "Auth Fail",
          });
        }

        return res.status(200).json({ token: data });
      }
    );
  } catch (error) {
    return res.status(400).json({
      message: "Auth Fail",
    });
  }
};
