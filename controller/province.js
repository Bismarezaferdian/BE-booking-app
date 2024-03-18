import axios from "axios";

const provinceController = {
  getProvince: async (req, res) => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      key: process.env.RAJAONGKIR_KEY,
    };
    const url = process.env.RAJAONGKIR_URL;
    try {
      const response = await axios.get(`${url}/province`, {
        headers,
      });
      res.status(200).json(response.data.rajaongkir.results);
    } catch (error) {
      console.log(error);
    }
  },
};

export default provinceController;
