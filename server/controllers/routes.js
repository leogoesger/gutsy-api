const Route = require("../models").Route;

module.exports = {
  retrieve(req, res) {
    return Route.find({
      where: {
        id: req.params.routeId,
        locationId: req.params.locationId,
      },
    })
      .then(route => {
        if (!route) {
          return err => res.status(400).send({message: "No route found"});
        }
        return route
          .then(route => res.status(200).send(route))
          .catch(err =>
            res.status(400).send({message: "Something went wrong!"})
          );
      })
      .catch(err =>
        res.status(400).send({message: "Something went wrong!" + req.body})
      );
  },

  create(req, res) {
    return Route.create({
      title: req.body.title,
      locationId: req.params.locationId,
    })
      .then(route => res.status(201).send(route))
      .catch(err => res.status(400).send(err));
  },

  update(req, res) {
    return Route.find({
      where: {
        id: req.params.routeId,
        locationId: req.params.locationId,
      },
    })
      .then(route => {
        if (!route) {
          return err => res.status(400).send(err);
        }
        return route
          .update(req.body, {fields: Object.keys(req.body)})
          .then(route => res.status(200).send(route))
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  },

  delete(req, res) {
    return Route.find({
      where: {
        id: req.params.routeId,
        locationId: req.params.locationId,
      },
    })
      .then(route => {
        if (!route) {
          return err => res.status(400).send(err);
        }
        return route
          .destroy()
          .then(route => res.status(204).send(route))
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  },
};
