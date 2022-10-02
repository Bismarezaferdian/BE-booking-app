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
  updateAvilabilityRoom: async (req, res, next) => {
    try {
      const date = await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates,
          },
        }
      );
      res.status(200).json("has been updated");
    } catch (err) {
      next(err);
    }
  },
  //delete room
  deleteRoom: async (req, res, next) => {
    const roomId = req.params.id;
    try {
      const hotelAll = await Hotel.find();
      const hotelId = [];
      hotelAll.map((hotel) =>
        hotel.rooms.filter((id) =>
          id.includes(roomId) ? hotelId.push(hotel.id) : ""
        )
      );

      hotelId.map(async (idHotel) => {
        await Hotel.findByIdAndUpdate(idHotel, {
          $pull: { rooms: roomId },
        });
      });

      try {
        await Room.findByIdAndDelete(roomId);
        res.status(200).json("has been delete");
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  },
  // await hotelId.map((idHotel) =>
  //   Hotel.findByIdAndUpdate(idHotel, {
  //     $pull: { rooms: roomId },
  //   })
  // );
  // await Room.findByIdAndDelete(roomId);

  // console.log(hotelId);
  //
  // await Room.findByIdAndDelete(roomId);
  // try {
  //   await Hotel.findByIdAndUpdate(hotelId, {
  //     $pull: { rooms: roomId },
  //   });
  // } catch (error) {
  //   next(error)
  // }
  //     res.status(200).json("has been delete");
  //   } catch (error) {
  //     next(error);
  //   }
  // },

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
