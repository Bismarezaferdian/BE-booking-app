import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import hotelRoute from "./routes/hotelRoute.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import roomRoute from "./routes/roomRoute.js";
import bookingRoute from "./routes/bookingRoute.js";
import placeRouter from "./routes/placeRoute.js";
import propertiesRouter from "./routes/typePropertiesRoute.js";
import cookieParse from "cookie-parser";
import cors from "cors";
// const express = require("express");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const apiRouter = require("./routes/api");
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    // console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

// mongoose.connection.on("disconnected", () => {
//   console.log("mongoDB disconnected!");
// });
// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "http://localhost:8000/api/v1/auth/login",
//     "https://be-booking-app-production.up.railway.app"
//   );
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Credentials:true");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH,OPTIONS"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());
app.use(cookieParse());
app.use(express.json());

// app.use("/", hotelRoute);
app.use("/api/v1/hotel", hotelRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/room", roomRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/place", placeRouter);
app.use("/api/v1/properties", propertiesRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong !";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// app.listen(8000, () => {
//   connect();
//   console.log("Connected to backend.");
// });

app.listen(process.env.PORT || 8000, function () {
  connect();
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
