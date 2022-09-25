const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
import { Document, Schema } from "mongoose";
import validator from "validator";

export interface IUser extends Document {
  email: string;
  password: string;
  // _id: string;
}

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

UserSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("Please provide email and password");
  }

  if (!validator.isEmail(email)) {
    throw Error("Please provide a valid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Please provide a strong password");
  }

  const exists: IUser = await this.findOne({ email });

  if (exists) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(15);
  const hash = await bcrypt.hash(password, salt);

  const user: IUser = await this.create({ email, password: hash });

  return user;
};

UserSchema.statics.login = async function (email: string, password: string) {
  if (!email || !password) {
    throw Error("Please provide email and password");
  }

  const user: IUser = await this.findOne({ email });

  if (!user) {
    throw new Error("Incorrect email");
  }

  const match: boolean = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", UserSchema);
