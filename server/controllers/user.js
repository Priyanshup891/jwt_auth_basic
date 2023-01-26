import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { name, company, country, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User is already exist!" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      company,
      country,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(200).json({ newUser, token });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: "User is not exist!" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(402).json({ msg: "Invalid Credentials" });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
