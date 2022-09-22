const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
import { Schema } from "mongoose";
import validator from "validator";

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.statics.signup = async function (email: string, password: string) {
  if (!email || !password) {
    throw Error("Please provide email and password");
  }

  if (!validator.isEmail(email)) {
    throw Error("Please provide a valid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Please provide a strong password");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(15);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

module.exports = mongoose.model("User", UserSchema);
