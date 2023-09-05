import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: "First name is required!",
    maxLength: [30, "First name must not exceed more than 30 characters!"],
    match: [
      /^[0-9A-Za-z\s]+$/,
      "First name accepts only letters, numbers and spaces!",
    ],
  },
  lastName: {
    type: String,
    trim: true,
    required: "Last Name is required!",
    maxLength: [30, "Last name must not exceed more than 30 characters!"],
    match: [
      /^[0-9A-Za-z\s]+$/,
      "Last name accepts only letters, numbers and spaces!",
    ],
  },
  email: {
    type: String,
    trim: true,
    required: "Email is required!",
    match: [/.+\@.+\../, "Please enter a valid email address!"],
  },
  password: {
    type: String,
    required: "Password is required!",
  },
});

userSchema.pre("save", async function (next) {
  const userModel = mongoose.model("user", userSchema);

  // Check for same email
  const checkEmail = await userModel.findOne({ email: this.email });
  if (checkEmail) next(new Error("Email is already registered!"));

  // Password validation and hashing
  if (this.password.length < 6)
    next(new Error("Password must contain at least 6 characters!"));

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    console.log(err);
    next(new Error(err));
  }
});

export default mongoose.model("user", userSchema);
