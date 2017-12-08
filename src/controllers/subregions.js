const Op = require('sequelize').Op;
const Subregion = require('../models').Subregion;
const Area = require('../models').Area;
const Region = require('../models').Region;

module.exports = {
  create(req, res) {
    return Subregion.create(req.body)
      .then(subregion => res.status(201).send(subregion))
      .catch(err => res.status(400).send(err));
  },

  list(req, res) {
    return Subregion.findAll({
      include: [{model: Area, as: 'areas'}],
    })
      .then(subregions => res.status(200).send(subregions))
      .catch(err => res.status(400).send(err));
  },

  show(req, res) {
    return Subregion.findById(req.params.subregionId, {
      include: [{model: Area, as: 'areas'}],
    })
      .then(subregion => res.status(200).send(subregion))
      .catch(err => res.status(400).send(err));
  },

  update(req, res) {
    return Subregion.findById(req.params.subregionId)
      .then(subregion => {
        if (!subregion) {
          return res.status(404).send({message: 'Subregion not found'});
        }
        return subregion
          .update(req.body, {fields: Object.keys(req.body)})
          .then(() => res.status(200).send(subregion))
          .catch(err => res.status(400).send({err}));
      })
      .catch(err => res.status(400).send(err));
  },

  delete(req, res) {
    return Subregion.findById(req.params.subregionId)
      .then(subregion => {
        if (!subregion) {
          return res.status(404).send({
            message: 'no subregion',
          });
        }
        return subregion
          .destroy()
          .then(() => res.status(204).send(subregion))
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  },

  search(req, res) {
    return Subregion.findAll({
      where: {
        name: {
          [Op.iLike]: `%${req.body.name}%`,
        },
      },
      attributes: {
        exclude: ['id', 'open', 'gps', 'createdAt', 'updatedAt', 'regionId'],
      },
      include: [
        {
          model: Region,
          foreignKey: 'regionId',
          as: 'region',
          attributes: {
            exclude: ['id', 'open', 'gps', 'createdAt', 'updatedAt'],
          },
        },
      ],
    }).then(subregions => {
      return res.status(200).send(subregions);
    });
  },
};
