// const User = require("../models/userModel");

const User = require("../models/userModel");

// login user

import { Response } from "express";

export const loginUser = async (req: Request, res: Response) => {
  res.json({ message: "login user" });
};

// signup user

export const signupUser = async (req: Request, res: Response) => {
  res.json({ message: "signup user" });
};

module.exports = { loginUser, signupUser };
