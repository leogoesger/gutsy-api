const Op = require('sequelize').Op;
const Route = require('../models').Route;
const User = require('../models').User;
const Book = require('../models').Book;

module.exports = {
  create(req, res) {
    return Route.create(req.body)
      .then(route => res.status(201).send(route))
      .catch(err => res.status(400).send(err));
  },

  show(req, res) {
    return Route.findById(req.params.routeId, {
      include: [
        {model: User, as: 'users'},
        {model: Book, foreignKey: 'bookId', as: 'books'},
      ],
    })
      .then(route => res.status(200).send(route))
      .catch(err => res.status(400).send(err));
  },

  update(req, res) {
    return Route.find({
      where: {
        id: req.params.routeId,
      },
    })
      .then(route => {
        if (!route) {
          return res.status(404).send({message: 'Climbing route not found'});
        }
        return route
          .update(req.body, {fields: Object.keys(req.body)})
          .then(() => res.status(200).send(route))
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  },

  delete(req, res) {
    return Route.find({
      where: {
        id: req.params.routeId,
      },
    })
      .then(route => {
        if (!route) {
          return res.status(404).send({message: 'Climbing route not found'});
        }
        return route
          .destroy()
          .then(() => res.status(204).send({message: 'Deleted'}))
          .catch(() =>
            res.status(400).send({message: 'Something went wrong!'})
          );
      })
      .catch(err => res.status(400).send(err));
  },

  search(req, res) {
    return Route.findAll({
      where: {
        name: {
          [Op.iLike]: `%${req.body.name}%`,
        },
      },
    }).then(routes => {
      if (!routes) {
        return res.status(404).send({message: 'Climbing route not found'});
      }
      return res.status(200).send(routes);
    });
  },
};
