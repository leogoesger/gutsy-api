const Op = require('sequelize').Op;

const Climb = require('../models').Climb;
const Book = require('../models').Book;
const Region = require('../models').Region;
const Subregion = require('../models').Subregion;
const Area = require('../models').Area;
const Subarea = require('../models').Subarea;

module.exports = {
  async create(req, res) {
    return Climb.create(req.body)
      .then(climb => res.status(201).send(climb))
      .catch(err => res.status(400).send(err));
  },

  show(req, res) {
    return Climb.findById(req.params.climbId, {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Book,
          foreignKey: 'bookId',
          as: 'books',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'BookClimb'],
          },
        },
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
    })
      .then(climb => res.status(200).send(climb))
      .catch(err => res.status(400).send(err));
  },

  update(req, res) {
    return Climb.find({
      where: {
        id: req.params.climbId,
      },
    })
      .then(climb => {
        if (!climb) {
          return res.status(404).send({message: 'Climbing climb not found'});
        }
        return climb
          .update(req.body, {fields: Object.keys(req.body)})
          .then(() => res.status(200).send(climb))
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  },

  delete(req, res) {
    return Climb.find({
      where: {
        id: req.params.climbId,
      },
    })
      .then(climb => {
        if (!climb) {
          return res.status(404).send({message: 'Climbing climb not found'});
        }
        return climb
          .destroy()
          .then(() => res.status(204).send({message: 'Deleted'}))
          .catch(() =>
            res.status(400).send({message: 'Something went wrong!'})
          );
      })
      .catch(err => res.status(400).send(err));
  },

  search(req, res) {
    return Climb.findAll({
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
    }).then(climbs => {
      return res.status(200).send(climbs);
    });
  },
};
