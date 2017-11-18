const UserRoute = require("../models").UserRoute;

module.exports = {
  create(req, res) {
    return UserRoute.create(req.body)
      .then(userRoute => res.status(201).send(userRoute))
      .catch(err => res.status(400).send(err));
  }
};
