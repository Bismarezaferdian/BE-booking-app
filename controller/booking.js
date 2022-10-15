import Booking from "../model/Booking.js";

const bookingController = {
  postBooking: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        bankFrom,
        bankAccountName,
        startDate,
        endDate,
      } = req.body;

      const newBooking = new Booking({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        bankFrom: bankFrom,
        bankAccountName: bankAccountName,
        startDate: startDate,
        endDate: endDate,
      });

      const saveBooking = await newBooking.save();
      res.status(200).json(saveBooking);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  viewAllBooking: async (req, res) => {
    try {
      const allBooking = await Booking.find();
      res.status(200).json(allBooking);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteBooking: async (req, res) => {
    try {
      await Booking.findByIdAndDelete(req.params.id);
      res.status(200).json("has been delete");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default bookingController;
