const UserClimb = require('../models').UserClimb;

module.exports = {
  create(req, res) {
    return UserClimb.create(req.body)
      .then(userClimb => res.status(201).send(userClimb))
      .catch(err => {
        res.status(400).send(err);
      });
  },
};
