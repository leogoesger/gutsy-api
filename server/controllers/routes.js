const Route = require("../models").Route;

module.exports = {
  create(req, res) {
    return Route.create({
      title: req.body.title,
      locationId: req.params.locationId,
    })
      .then(route => res.status(201).send(route))
      .catch(err => res.status(400).send(err));
  },
};
