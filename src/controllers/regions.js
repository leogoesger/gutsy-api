const Op = require('sequelize').Op;

const Region = require('../models').Region;
const Subregion = require('../models').Subregion;
const Area = require('../models').Area;
const Subarea = require('../models').Subarea;
const Climb = require('../models').Climb;

import {
  climbGradeConverter,
  climbGradeRange,
  regionPickClimbs,
} from '../utils/helpers';

module.exports = {
  create(req, res) {
    return Region.create(req.body)
      .then(region => res.status(201).send(region))
      .catch(err => res.status(400).send(err));
  },

  list(req, res) {
    return Region.findAll({
      include: [{model: Subregion, as: 'subregions'}],
    })
      .then(regions => res.status(200).send(regions))
      .catch(err => res.status(400).send(err));
  },

  show(req, res) {
    return Region.findById(req.params.regionId, {
      include: [{model: Subregion, as: 'subregions'}],
    })
      .then(region => res.status(200).send(region))
      .catch(err => res.status(400).send(err));
  },

  update(req, res) {
    return Region.findById(req.params.regionId)
      .then(region => {
        if (!region) {
          return res.status(404).send({message: 'Region not found'});
        }
        return region
          .update(req.body, {fields: Object.keys(req.body)})
          .then(() => res.status(200).send(region))
          .catch(err => res.status(400).send({err}));
      })
      .catch(err => res.status(400).send(err));
  },

  delete(req, res) {
    return Region.findById(req.params.regionId)
      .then(region => {
        if (!region) {
          return res.status(404).send({
            message: 'no region',
          });
        }
        return region
          .destroy()
          .then(() => res.status(204).send(region))
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  },

  search(req, res) {
    return Region.findAll({
      where: {
        name: {
          [Op.iLike]: `%${req.body.name}%`,
        },
      },
      limit: 2,
      attributes: {
        exclude: ['open', 'gps', 'createdAt', 'updatedAt'],
      },
    }).then(regions => {
      return res.status(200).send(regions);
    });
  },

  fetchClimb(req, res) {
    if (
      !req.body.min ||
      !req.body.max ||
      !req.body.regionId ||
      !req.body.category ||
      climbGradeConverter(req.body.min) > climbGradeConverter(req.body.max)
    ) {
      res.status(400).send({message: 'Wrong Information sent!'});
    }
    return Region.findById(req.body.regionId, {
      attributes: {
        exclude: [
          'name',
          'open',
          'gps',
          'createdAt',
          'updatedAt',
          'description',
        ],
      },
      include: [
        {
          model: Subregion,
          as: 'subregions',
          attributes: {
            exclude: [
              'name',
              'open',
              'gps',
              'description',
              'createdAt',
              'updatedAt',
            ],
          },
          include: {
            model: Area,
            as: 'areas',
            attributes: {
              exclude: [
                'name',
                'open',
                'gps',
                'description',
                'createdAt',
                'updatedAt',
              ],
            },
            include: {
              model: Subarea,
              as: 'subareas',
              attributes: {
                exclude: [
                  'name',
                  'open',
                  'gps',
                  'description',
                  'createdAt',
                  'updatedAt',
                ],
              },
              include: {
                model: Climb,
                as: 'climbs',
                attributes: {
                  exclude: ['open', 'createdAt', 'updatedAt'],
                },
                where: {
                  [Op.or]: climbGradeRange(req.body.min, req.body.max),
                  [Op.and]: {category: req.body.category},
                },
              },
            },
          },
        },
      ],
    })
      .then(region => {
        res.status(200).send(regionPickClimbs(region));
      })
      .catch(err => res.status(400).send(err));
  },
};
