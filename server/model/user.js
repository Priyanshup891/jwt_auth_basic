import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      min: 6,
      max: 20,
    },
  },
  {
    timestamps: {
      createdAt: "crtAt",
      updatedAt: "upAt",
    },
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
