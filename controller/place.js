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
    const limit = req.query?.limit ? parseInt(req.query.limit) : null; // Set limit to null if not specified

    try {
      const pipeline = [
        {
          $lookup: {
            from: "hotels",
            localField: "_id",
            foreignField: "place",
            as: "countAllHotel",
          },
        },
      ];

      if (limit !== null) {
        pipeline.push({
          $limit: limit,
        });
      }

      Place.aggregate(pipeline).exec((err, result) => {
        if (err) {
          console.log("error", err);
          res.status(500).json(err); // Return error response
          return;
        }
        res.status(200).json(result); // Return successful response
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

export default placeController;
