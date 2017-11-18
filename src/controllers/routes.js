const Route = require("../models").Route;

module.exports = {
  create(req, res) {
    return Route.create(req.body)
      .then(route => res.status(201).send(route))
      .catch(err => res.status(400).send(err));
  },

  show(req, res) {
    return Route.findById(req.params.routeId, {
      include: [{ model: User, as: "users" }]
    })
      .then(route => res.status(200).send({ message: "hello" }))
      .catch(err => res.status(400).send(err));
  },

  update(req, res) {
    return Route.find({
      where: {
        id: req.params.routeId
      }
    })
      .then(route => {
        if (!route) {
          return err => res.status(400).send(err);
        }
        return route
          .update(req.body, { fields: Object.keys(req.body) })
          .then(route => res.status(200).send(route))
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  },

  delete(req, res) {
    return Route.find({
      where: {
        id: req.params.routeId
      }
    })
      .then(route => {
        return route
          .destroy()
          .then(route => res.status(204).send({ message: "Deleted" }))
          .catch(err =>
            res.status(400).send({ message: "Something went wrong!" })
          );
      })
      .catch(err => res.status(400).send({ message: "Something went wrong!" }));
  }
};
