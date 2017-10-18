const Location = require("../models").Location;
const Route = require("../models").Route;

module.exports = {
  create(req, res) {
    return Location.create({
      title: req.body.title,
      open: req.body.open,
    })
      .then(location => res.status(201).send(location))
      .catch(err => res.status(400).send(err));
  },

  list(req, res) {
    return Location.findAll({
      include: [
        {
          model: Route,
          as: "routes",
        },
      ],
    })
      .then(locations => res.status(200).send(locations))
      .catch(err => res.status(400).send(err));
  },
};
