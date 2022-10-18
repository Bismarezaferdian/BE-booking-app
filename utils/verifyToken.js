import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const createVerifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(req.cookies);
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      next(createError(403, "token not valid !"));
    }
    req.user = user;
    // console.log(req.user.id);
    next();
  });
};

export const isAdmin = async (req, res, next) => {
  if (!req.user.isAdmin)
    return res.status(401).send({ msg: "Not an admin, sorry" });
  next();
};
