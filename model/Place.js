// const mongoose = require("mongoose");
import mongoose from "mongoose";
const { Schema } = mongoose;

const PlaceSchema = new Schema({
  city: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    // require: true,
  },
});

// module.export = mongoose.model("hotel", HotelSchema);
export default mongoose.model("Place", PlaceSchema);
