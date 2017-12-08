const Op = require('sequelize').Op;
const Area = require('../models').Area;
const Subarea = require('../models').Subarea;
const Route = require('../models').Route;
const Subregion = require('../models').Subregion;
const Region = require('../models').Region;

module.exports = {
  async create(req, res) {
    return Subarea.create(req.body)
      .then(subarea => res.status(201).send(subarea))
      .catch(err => res.status(400).send(err));
  },

  list(req, res) {
    return Subarea.findAll({
      include: [{model: Route, as: 'routes'}],
    })
      .then(subareas => res.status(200).send(subareas))
      .catch(err => res.status(400).send(err));
  },

  show(req, res) {
    return Subarea.findById(req.params.subareaId, {
      include: [{model: Route, as: 'routes'}],
    })
      .then(subarea => res.status(200).send(subarea))
      .catch(err => res.status(400).send(err));
  },

  update(req, res) {
    return Subarea.findById(req.params.subareaId, {
      include: [{model: Route, as: 'routes'}],
    })
      .then(subarea => {
        if (!subarea) {
          return res.status(404).send({message: 'Subarea not found'});
        }
        return subarea
          .update(req.body, {fields: Object.keys(req.body)})
          .then(() => res.status(200).send(subarea))
          .catch(err => res.status(400).send(err));
      })
      .catch(err =>
        res
          .status(400)
          .send({message: 'Something happened updating subarea!', error: err})
      );
  },

  delete(req, res) {
    return Subarea.findById(req.params.subareaId)
      .then(subarea => {
        if (!subarea) {
          return res.status(404).send({
            message: 'no subarea',
          });
        }
        return subarea
          .destroy()
          .then(() => res.status(204).send({message: 'deleted item'}))
          .catch(err => res.status(400).send(err));
      })
      .catch(err =>
        res
          .status(400)
          .send({message: 'Something happened deleting subarea!', error: err})
      );
  },

  search(req, res) {
    return Subarea.findAll({
      where: {
        name: {
          [Op.iLike]: `%${req.body.name}%`,
        },
      },
      attributes: {
        exclude: ['id', 'open', 'gps', 'createdAt', 'updatedAt', 'areaId'],
      },
      include: [
        {
          model: Area,
          foreignKey: 'areaId',
          as: 'area',
          attributes: {
            exclude: [
              'id',
              'open',
              'gps',
              'createdAt',
              'updatedAt',
              'subregionId',
            ],
          },
          include: {
            model: Subregion,
            foreignKey: 'subregionId',
            as: 'subregion',
            attributes: {
              exclude: [
                'id',
                'open',
                'gps',
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
                exclude: ['id', 'open', 'gps', 'createdAt', 'updatedAt'],
              },
            },
          },
        },
      ],
    }).then(subareas => {
      return res.status(200).send(subareas);
    });
  },
};
