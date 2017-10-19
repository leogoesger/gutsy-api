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

  retrieve(req, res) {
    return Location.findById(req.params.locationId, {
      include: [
        {
          model: Route,
          as: "routes",
        },
      ],
    })
      .then(location => res.status(200).send(location))
      .catch(err => res.status(400).send(err));
  },

  update(req, res) {
    return Location.findById(req.params.locationId, {
      include: [{model: Route, as: "routes"}],
    })
      .then(location => {
        if (!location) {
          return res.status(400).send({message: "Location not found"});
        }
        return location
          .update(req.body, {fields: Object.keys(req.body)})
          .then(() => res.status(200).send(location))
          .catch(err => res.status(400).send({message: "error updating"}));
      })
      .catch(err => res.status(400).send(err));
  },

  delete(req, res) {
    return Location.findById(req.params.locationId)
      .then(location => {
        if (!location) {
          return res.status(400).send({
            message: "no location",
          });
        }
        return location
          .destroy()
          .then(() => res.status(204).send())
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  },
};
