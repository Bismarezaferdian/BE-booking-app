import mongoose from "mongoose";
const { Schema } = mongoose;

const BookingSchema = new Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  bankFrom: {
    type: String,
    require: true,
  },
  bankAccountName: {
    type: String,
    require: true,
  },
  startDate: {
    type: String,
    require: true,
  },
  endDate: {
    type: String,
    require: true,
  },
});

export default mongoose.model("booking", BookingSchema);
