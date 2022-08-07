import Room from "../model/Room.js";
import Hotel from "../model/Hotel.js";

const roomController = {
  getRoom: (req, res) => {
    res.send("this is room ");
  },
  //   post room
  postRoom: async (req, res, next) => {
    const hotelId = req.params.idHotel;
    const newRoom = new Room(req.body);

    try {
      const saveRoom = await newRoom.save();
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $push: { rooms: saveRoom._id },
        });
      } catch (error) {
        next(error);
      }
      res.status(200).json(saveRoom);
    } catch (error) {
      next(error);
    }
  },
  //update room
  updateRoom: async (req, res, next) => {
    try {
      const updateRoom = await Room.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateRoom);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //delete room
  deleteRoom: async (req, res, next) => {
    const hotelId = req.params.idHotel;
    const roomId = req.params.id;
    try {
      await Room.findByIdAndDelete(roomId);
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $pull: { rooms: roomId },
        });
      } catch (error) {
        next(error);
      }
      res.status(200).json("has been delete");
    } catch (error) {
      next(error);
    }
  },

  //view room
  viewRoom: async (req, res, next) => {
    try {
      const rooms = await Room.findById(req.params.id);
      res.status(200).json(rooms);
    } catch (error) {
      next(error);
    }
  },
  //view all room
  viewAllRooms: async (req, res, next) => {
    // const failed = true;

    try {
      const roomsAll = await Room.find();
      res.status(200).json(roomsAll);
    } catch (error) {
      next(error);
    }
  },
};

export default roomController;
