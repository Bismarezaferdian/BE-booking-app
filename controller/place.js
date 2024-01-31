import Place from "../model/Place.js";

const placeController = {
  getPlace: async (req, res) => {
    const limits = req.query.limit;
    try {
      const place = await Place.find().limit(limits);
      res.status(200).json(place);
    } catch (error) {
      console.log(error);
      res.status(404).json(error);
    }
  },
  addPlace: async (req, res) => {
    const newPlace = new Place(req.body);
    try {
      const savePlace = await newPlace.save();
      res.status(200).json(savePlace);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deletePlace: async (req, res) => {
    const id = req.params.id;
    try {
      await Place.findByIdAndDelete(id);
      res.status(200).json("data has been delete");
    } catch (error) {
      res.status(500).json("something went wrong");
    }
  },

  updatePlace: async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
      const place = await Place.findByIdAndUpdate(id, data, { new: true });
      res.status(200).json(place);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //get place inclue with hotel
  //hotel must be have obejctId place(relationship hotel to place)
  placeWithAllHotel: async (req, res) => {
    try {
      Place.aggregate([
        // {
        //   //with project same as select on mysql
        //   //if project undifined canot use function lookup
        //   $project: {
        //     //select id from place and convert to string
        //     _id: {
        //       $toString: "$_id",
        //     },
        //     //select city from place
        //     city: {
        //       $toString: "$city",
        //     },
        //     image: 1,
        //   },
        // },
        {
          //for get data from hotel have same id or same relationship
          $lookup: {
            from: "hotels",
            //localFiend and foregnField must have sama value
            localField: "_id",
            foreignField: "place",
            as: "countAllHotel",
          },
        },
      ]).exec((err, result) => {
        if (err) {
          console.log("error", err);
        }
        if (result) {
          res.status(200).json(result);
        }
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default placeController;
