const User = require("../models").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      password: bcrypt.hashSync(req.body.password, 10)
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
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const myToken = jwt.sign({ username: req.body.email }, "leogoesger");
          res.status(200).json(myToken);
        } else {
          res.status(404).send({ message: "Wrong Password" });
        }
      })
      .catch(err => res.status(400).send(err));
  }
};
