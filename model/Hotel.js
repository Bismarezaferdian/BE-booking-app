// const mongoose = require("mongoose");
import mongoose from "mongoose";
const { Schema } = mongoose;

const HotelSchema = new Schema({
  name: {
    type: String,
    require: true,
  },

  //this code reference to Properties model , create relationship database with properties
  //Properties as foregnField on PropertiesModel
  //why dont use type.Schema.ObjectId ? cause if use that cant lookup with foregenField type objectId
  properties: {
    type: Schema.Types.ObjectId,
    ref: "Properties",
  },
  city: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  distance: {
    type: String,
    require: true,
  },
  photo: {
    type: [String],
  },

  title: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    require: true,
  },
  feature: {
    type: Boolean,
    default: false,
  },
  place: {
    // type: Schema.Types.ObjectId,
    type: Schema.Types.ObjectId,
    ref: "Place",
  },
});

// module.export = mongoose.model("hotel", HotelSchema);
export default mongoose.model("Hotel", HotelSchema);
