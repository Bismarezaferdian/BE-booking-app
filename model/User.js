// const mongoose = require("mongoose");
import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },

    password: {
      type: String,
      require: true,
      unique: true,
    },
    photo: {
      type: [String],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// module.export = mongoose.model("hotel", HotelSchema);
export default mongoose.model("user", UserSchema);
