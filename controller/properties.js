import Properties from "../model/Properties.js";

const propertiesController = {
  addProperties: async (req, res) => {
    const newProperties = new Properties(req.body);
    try {
      const saveProperties = await newProperties.save();
      res.status(200).json(saveProperties);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateProperties: async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
      const properties = await Properties.findByIdAndUpdate(id, data, {
        new: true,
      });

      res.status(200).json(properties);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteProperties: (req, res) => {
    const id = req.params.id;

    Properties.findByIdAndDelete(id)
      .then(() => res.status(200).json("properties has been delete"))
      .catch(() => res.status(500).json("something went wrong"));
  },

  getProperties: async (req, res) => {
    try {
      const properties = await Properties.find();
      res.status(200).json(properties);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  propertiesWithAllHotel: async (req, res) => {
    try {
      Properties.aggregate([
        // {
        //   //with project same as select on mysql
        //   //if project undifined canot use function lookup
        //   $project: {
        //     //select id from place and convert to string
        //     _id: {
        //       $toString: "$_id",
        //     },
        //     //select city from place
        //     name: {
        //       $toString: "$name",
        //     },
        //     image: {
        //       $toString: "$image",
        //     },
        //   },
        // },
        {
          //for get data from hotel have same id or same relationship
          $lookup: {
            from: "hotels",
            //localFiend and foregnField must have sama value
            localField: "_id",
            foreignField: "properties",
            as: "countAllProperties",
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

export default propertiesController;
