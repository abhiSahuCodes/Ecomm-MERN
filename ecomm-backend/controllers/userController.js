
import User from "../models/userSchema.js";
import bcrypt from "bcrypt";

// Function to hash the password
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

// Function to compare password with hashed password
const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

// Controller function for user signup
const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.send({ message: "Email id is already registered", alert: false });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.send({ message: "Successfully signed up", alert: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Controller function for user login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.send({ message: "Email is not available, please sign up", alert: false });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.send({ message: "Invalid credentials", alert: false });
    }

    const { _id, firstName, lastName, image } = user;
    const dataSend = {
      _id,
      firstName,
      lastName,
      email,
      image,
    };

    res.send({
      message: "Login is successful",
      alert: true,
      data: dataSend,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export { signup, login };
