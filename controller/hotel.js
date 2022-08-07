import Hotel from "../model/Hotel.js";
// import { createError } from "../utils/error.js";

const hotelController = {
  user: (req, res) => {
    res.send("connect user");
  },

  //auth
  //hotels
  hotels: (req, res) => {
    res.send("this is hotels");
  },
  //add hotels
  postHotels: async (req, res) => {
    try {
      const {
        name,
        type,
        city,
        address,
        distance,
        title,
        desc,
        cheapestPrice,
      } = req.body;

      const newHotel = new Hotel({
        name: name,
        type: type,
        city: city,
        address: address,
        distance: distance,
        title: title,
        desc: desc,
        cheapestPrice: cheapestPrice,
      });

      const saveHotel = await newHotel.save();

      res.status(200).json(saveHotel);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //update hotels
  updateHotels: async (req, res) => {
    try {
      const updateHotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateHotel);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //delete hotels
  deleteHotels: async (req, res) => {
    try {
      await Hotel.findByIdAndDelete(req.params.id);
      res.status(200).json("has been delete");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //view by id
  viewHotel: async (req, res) => {
    try {
      const hotels = await Hotel.findById(req.params.id);
      res.status(200).json(hotels);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //find all
  viewAllHotels: async (req, res, next) => {
    const failed = true;

    try {
      const hotelsAll = await Hotel.find();
      res.status(200).json(hotelsAll);
    } catch (error) {
      next(error);
    }
  },
  //rooms
  //users
};

export default hotelController;
