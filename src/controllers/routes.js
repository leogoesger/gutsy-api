const Op = require('sequelize').Op;

const Route = require('../models').Route;
const User = require('../models').User;
const Book = require('../models').Book;
const Region = require('../models').Region;
const Subregion = require('../models').Subregion;
const Area = require('../models').Area;
const Subarea = require('../models').Subarea;

module.exports = {
  async create(req, res) {
    return Route.create(req.body)
      .then(route => res.status(201).send(route))
      .catch(err => res.status(400).send(err));
  },

  show(req, res) {
    return Route.findById(req.params.routeId, {
      include: [
        {model: User, foreignKey: 'userId', as: 'users'},
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
      limit: 5,
      attributes: {
        exclude: ['open', 'createdAt', 'updatedAt', 'subareaId'],
      },
      include: [
        {
          model: Subarea,
          foreignKey: 'subareaId',
          as: 'subarea',
          attributes: {
            exclude: ['open', 'gps', 'createdAt', 'updatedAt', 'areaId'],
          },
          include: {
            model: Area,
            foreignKey: 'areaId',
            as: 'area',
            attributes: {
              exclude: ['open', 'gps', 'createdAt', 'updatedAt', 'subregionId'],
            },
            include: {
              model: Subregion,
              foreignKey: 'subregionId',
              as: 'subregion',
              attributes: {
                exclude: ['open', 'gps', 'createdAt', 'updatedAt', 'regionId'],
              },
              include: {
                model: Region,
                foreignKey: 'regionId',
                as: 'region',
                attributes: {
                  exclude: ['open', 'gps', 'createdAt', 'updatedAt'],
                },
              },
            },
          },
        },
      ],
    }).then(routes => {
      return res.status(200).send(routes);
    });
  },
};
