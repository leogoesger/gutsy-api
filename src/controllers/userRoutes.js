const Apple = require("../models").Apple;

module.exports = {
  create(req, res) {
    return Apple.create({
      quantity: req.body.quantity
    })
      .then(area => res.status(201).send(area))
      .catch(err => res.status(400).send(err));
  }
};
