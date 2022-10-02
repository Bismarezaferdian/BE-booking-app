import User from "../model/User.js";
import { createError } from "../utils/error.js";
import { createVerifyToken } from "../utils/verifyToken.js";

const userController = {
  user: (req, res) => {
    res.send("connect user");
  },

  //auth
  //Users
  users: (req, res) => {
    res.send("this is Users");
  },
  // add Users
  postUsers: async (req, res) => {
    const newUser = new User(req.body);
    try {
      // const {
      //   name,
      //   type,
      //   city,
      //   address,
      //   distance,
      //   title,
      //   desc,
      //   cheapestPrice,
      // } = req.body;

      // const newUser = new User({
      // name: name,
      // type: type,
      // city: city,
      // address: address,
      // distance: distance,
      // title: title,
      // desc: desc,
      // cheapestPrice: cheapestPrice,
      // });

      const saveUser = await newUser.save();

      res.status(200).json(saveUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //update Users
  updateUsers: async (req, res) => {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //delete Users
  deleteUsers: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("has been delete");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //view by id
  viewUser: async (req, res) => {
    try {
      const users = await User.findById(req.params.id);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //find all
  viewAllUsers: async (req, res, next) => {
    // const failed = true;

    try {
      const usersAll = await User.find();
      res.status(200).json(usersAll);
    } catch (error) {
      next(error);
    }
  },

  verifyUser: (req, res, next) => {
    createVerifyToken(req, res, next, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        next(createError(401, "you are not User !"));
      }
    });
  },

  verifyAdmin: (req, res, next) => {
    createVerifyToken(req, res, next, () => {
      if (req.user.isAdmin) {
        console.log("ok");
      } else {
        next(createError(401, "you are not admin !"));
      }
    });
  },

  //rooms
  //users
};

export default userController;
