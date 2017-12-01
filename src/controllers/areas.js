const Op = require('sequelize').Op;
const Area = require('../models').Area;
const Route = require('../models').Route;

module.exports = {
  create(req, res) {
    return Area.create(req.body)
      .then(area => res.status(201).send(area))
      .catch(err => res.status(400).send(err));
  },

  list(req, res) {
    return Area.findAll({
      include: [{model: Route, as: 'routes'}],
    })
      .then(areas => res.status(200).send(areas))
      .catch(err => res.status(400).send(err));
  },

  show(req, res) {
    return Area.findById(req.params.areaId, {
      include: [{model: Route, as: 'routes'}],
    })
      .then(area => res.status(200).send(area))
      .catch(err => res.status(400).send(err));
  },

  update(req, res) {
    return Area.findById(req.params.areaId, {
      include: [{model: Route, as: 'routes'}],
    })
      .then(area => {
        if (!area) {
          return res.status(404).send({message: 'Area not found'});
        }
        return area
          .update(req.body, {fields: Object.keys(req.body)})
          .then(() => res.status(200).send(area))
          .catch(err => res.status(400).send(err));
      })
      .catch(err =>
        res
          .status(400)
          .send({message: 'Something happened updating area!', error: err})
      );
  },

  delete(req, res) {
    return Area.findById(req.params.areaId)
      .then(area => {
        if (!area) {
          return res.status(404).send({
            message: 'no area',
          });
        }
        return area
          .destroy()
          .then(() => res.status(204).send({message: 'deleted item'}))
          .catch(err => res.status(400).send(err));
      })
      .catch(err =>
        res
          .status(400)
          .send({message: 'Something happened deleting area!', error: err})
      );
  },

  search(req, res) {
    return Area.findAll({
      where: {
        name: {
          [Op.iLike]: `%${req.body.name}%`,
        },
      },
    }).then(areas => {
      if (!areas) {
        return res.status(404).send({message: 'Area not found'});
      }
      return res.status(200).send(areas);
    });
  },
};
