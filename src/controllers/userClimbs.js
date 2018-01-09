const UserClimb = require('../models').UserClimb;

module.exports = {
  findOrCreate(req, res) {
    if (!req.body.userId || !req.body.climbId) {
      return res.status(400).send('Request Failed!');
    }
    return UserClimb.findOrCreate({
      where: {userId: req.body.userId, climbId: req.body.climbId},
      defaults: {userClimbStatusId: req.body.userClimbStatusId},
    })
      .spread((userClimb, created) => {
        if (created) {
          return res.status(201).send(userClimb);
        }
        return userClimb
          .update(req.body, {userClimbStatusId: req.body.userClimbStatusId})
          .then(updateUserClimb => res.status(200).send(updateUserClimb));
      })
      .catch(() => res.status(400).send({message: 'Something went wrong!'}));
  },
};
