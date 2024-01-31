import Hotel from "../model/Hotel.js";
import Room from "../model/Room.js";
// import { createError } from "../utils/error.js";

const hotelController = {
  //add hotels
  postHotels: async (req, res) => {
    const newHotel = new Hotel(req.body);
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

      // const newHotel = new Hotel({
      //   name: name,
      //   type: type,
      //   city: city,
      //   address: address,
      //   distance: distance,
      //   title: title,
      //   desc: desc,
      //   cheapestPrice: cheapestPrice,
      // });

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

  getAllHotel: async (req, res) => {
    const limits = req.query.limit;
    console.log(limits);
    try {
      const hotel = await Hotel.find()
        .populate({
          path: "place properties",
        })
        .limit(limits);

      res.status(200).json(hotel);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //find all
  getHotelFromCity: async (req, res, next) => {
    // const failed = true;
    const { city } = req.query;
    try {
      const hotelsAll = await Hotel.find()
        .populate({
          path: "place",
          match: {
            city: city,
          },
        })
        .exec();
      if (hotelsAll) {
        const filteredHotels = hotelsAll.filter((item) => item.place);
        res.status(200).json(filteredHotels);
      }
      // const hotelsAll = await Hotel.find({
      //   ...others,
      //   cheapestPrice: { $gt: min | 1, $lt: max || 10000000 },
      // })
      //   .limit(req.query.limit)
    } catch (error) {
      next(error);
    }
  },

  //find by city
  countByCity: async (req, res, next) => {
    const cities = req.query.cities.split(",");

    try {
      const list = await Promise.all(
        cities.map((city) => {
          return Hotel.countDocuments({ city: city });
        })
      );

      res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  },

  // count by type
  // countType: async (req, res, next) => {
  //   try {
  //     const countHotel = await Hotel.countDocuments({ type: "hotel" });
  //     const countApartement = await Hotel.countDocuments({
  //       type: "apartement",
  //     });
  //     const countVilla = await Hotel.countDocuments({ type: "villa" });
  //     const countResort = await Hotel.countDocuments({ type: "resort" });
  //     const countCabin = await Hotel.countDocuments({ type: "cabin" });

  //     // console.log(list);
  //     res.status(200).send([
  //       { type: "hotel", count: countHotel },
  //       { type: "apartement", count: countApartement },
  //       { type: "villa", count: countVilla },
  //       { type: "resort", count: countResort },
  //       { type: "cabin", count: countCabin },
  //     ]);
  //   } catch (error) {
  //     next(error);
  //   }
  // },
  //rooms
  getHotelrooms: async (req, res, next) => {
    const hotel = await Hotel.findById(req.params.id);
    try {
      const List = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(List);
    } catch (error) {
      next(error);
    }
  },
  //users
};

export default hotelController;
