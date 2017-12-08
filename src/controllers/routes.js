const Op = require('sequelize').Op;
const Route = require('../models').Route;
const Subarea = require('../models').Subarea;
const User = require('../models').User;
const Book = require('../models').Book;
const Area = require('../models').Area;
const Region = require('../models').Region;

module.exports = {
  async create(req, res) {
    const subarea = await Subarea.findById(req.body.subareaId);
    const location = {
      regionName: JSON.parse(subarea.location).regionName,
      regionId: JSON.parse(subarea.location).regionId,
      areaName: JSON.parse(subarea.location).areaName,
      areaId: JSON.parse(subarea.location).areaId,
      subareaName: subarea.name,
      subareaId: subarea.id,
    };
    return Route.create(
      Object.assign(req.body, {location: JSON.stringify(location)})
    )
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
      attributes: {
        exclude: [
          'id',
          'open',
          'location',
          'createdAt',
          'updatedAt',
          'subareaId',
        ],
      },
      include: [
        {
          model: Subarea,
          foreignKey: 'subareaId',
          as: 'subarea',
          attributes: {
            exclude: [
              'id',
              'open',
              'gps',
              'location',
              'createdAt',
              'updatedAt',
              'areaId',
            ],
          },
          include: {
            model: Area,
            foreignKey: 'areaId',
            as: 'area',
            attributes: {
              exclude: [
                'id',
                'open',
                'gps',
                'location',
                'createdAt',
                'updatedAt',
                'regionId',
              ],
            },
            include: {
              model: Region,
              foreignKey: 'regionId',
              as: 'region',
              attributes: {
                exclude: ['id', 'open', 'createdAt', 'updatedAt'],
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
