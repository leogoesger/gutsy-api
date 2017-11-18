const UserRoute = require("../models").UserRoute;

module.exports = {
  create(req, res) {
    return UserRoute.create({
      quantity: req.body.quantity,
      userId: req.body.userId,
      routeId: req.body.routeId
    })
      .then(userRoute => res.status(201).send(userRoute))
      .catch(err => res.status(400).send(err));
  }
};
