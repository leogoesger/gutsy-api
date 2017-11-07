const Area = require("../models").Area;

module.exports = {
  getAll(req, res) {
    res.status(200).send({ message: "getting all areas" });
  }
};
