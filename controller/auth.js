import User from "../model/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

const authController = {
  user: (req, res) => {
    res.send("connect user");
  },

  register: async (req, res, next) => {
    const { userName, email, password, photo, isAdmin } = req.body;
    try {
      if (
        userName === undefined ||
        email === undefined ||
        password === undefined
      ) {
        return next(createError(404, "data is require !"));
      }
      const user = await User.findOne({
        userName: userName,
        emil: email,
      });
      if (user) {
        return next(createError(400, "user has been register !"));
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = new User({
        userName: userName,
        email: email,
        password: hash,
        photo: photo,
        isAdmin: isAdmin,
      });
      // const newUser = new User(req.body, { password: hash });
      await newUser.save();
      res.status(200).send("user has been create");
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    const { userName } = req.body;
    try {
      // res.send("connect user");
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
      // console.log(token);

      //user._doc di ambil dari yang di kembalikan di response dari user (test postman)
      // const { password,isAdmin ...others } = user._doc;
      const { password, ...others } = user._doc;
      res
        .cookie("token", token, {
          path: "/",

          // httpOnly: true,
          // secure: true,
          // sameSite: "none",
        })
        .status(200)
        //hanya di kembalikan spreetoperator, kecuali password dan isadmin
        .json({ ...others });
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
