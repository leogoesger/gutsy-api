const User = require("../models").User;

module.exports = {
  create(req, res) {
    if (!req.body.email) {
      res.status(400).send("email not found");
      return;
    }
    if (!req.body.password) {
      res.status(400).send("password not found");
      return;
    }

    User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(user => res.status(200).send(user))
      .catch(err => res.status(400).send(err));
  },

  retrieve(req, res) {
    if (!req.body.email) {
      res.status(400).send("email not found");
      return;
    }
    if (!req.body.password) {
      res.status(400).send("password not found");
      return;
    }

    User.find({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (user.password == req.body.password) {
          res.status(200).send(user);
        } else {
          res.status(404).send({ message: "password is incorrect!" });
        }
      })
      .catch(err => res.status(400).send(err));
  }
};
