import User from "../model/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

const authController = {
  user: (req, res) => {
    res.send("connect user");
  },

  register: async (req, res, next) => {
    const { userName, email, password } = req.body;
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = new User({
        userName: userName,
        email: email,
        password: hash,
      });
      await newUser.save();
      res.status(200).send("user has been create");
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    const { userName } = req.body;
    try {
      const user = await User.findOne({ userName: userName });
      if (!user) return next(createError(404, "User not found!"));

      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) return next(createError(400, "Wrong password !"));

      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT
      );

      const { password, isAdmin, ...others } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ ...others });
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
