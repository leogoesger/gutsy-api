const BookClimb = require('../models').BookClimb;

module.exports = {
  create(req, res) {
    return BookClimb.create(req.body)
      .then(bookClimb => res.status(201).send(bookClimb))
      .catch(err => res.status(400).send(err));
  },
};
