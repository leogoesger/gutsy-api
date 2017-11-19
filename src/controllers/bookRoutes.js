const BookRoute = require("../models").BookRoute;

module.exports = {
  create(req, res) {
    return BookRoute.create(req.body)
      .then(bookRoute => res.status(201).send(bookRoute))
      .catch(err => res.status(400).send(err));
  }
};
