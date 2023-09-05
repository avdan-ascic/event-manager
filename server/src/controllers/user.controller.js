import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model";
import config from "../config";

const create = (req, res, next) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => res.status(200).json({ message: "User created successfully." }))
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: err.message });
    });
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ error: "Email is not registered" });

    const passwordCheck = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordCheck)
      return res.status(400).json({ error: "Wrong password!" });

    req.session.user = user;

    const token = jwt.sign({ id: user._id }, config.jwt_secret);
    res.cookie("token", token, { expire: new Date() + 999, httpOnly: true });

    return res.status(200).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const readById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) return res.status(400).json({ error: "User not found!" });
      return res.status(200).json({
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err.message });
    });
};

const isAuthenticated = (req, res, next) => {
  const user = req.user;
  return res.status(200).json({
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });
};

const logout = (req, res, next) => {
  req.session.destroy();
  res.clearCookie("token");
  res.clearCookie("connect.sid");
  return res.status(200).json({ message: "User logged out successfully." });
};

export default { create, login, readById, isAuthenticated, logout };
