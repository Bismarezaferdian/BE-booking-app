import mongoose from "mongoose";
const { Schema } = mongoose;

const PropertiesSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
});

// module.export = mongoose.model("hotel", HotelSchema);
export default mongoose.model("Properties", PropertiesSchema);
