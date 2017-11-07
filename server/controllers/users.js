const User = require("../models").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  signUp(req, res) {
    if (!req.body.email || !req.body.password) {
      res.status(400).send("email not found");
      return;
    }

    User.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    })
      .then(user => {
        const myToken = jwt.sign({ email: req.body.email }, "leogoesger");
        res.status(200).send(myToken);
      })
      .catch(err => res.status(400).send(err));
  },

  login(req, res) {
    if (!req.body.email || !req.body.password) {
      res.status(400).send("email not found");
      return;
    }

    User.find({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const myToken = jwt.sign({ email: req.body.email }, "leogoesger");
          res.status(200).json(myToken);
        } else {
          res.status(404).send({ message: "Wrong Password" });
        }
      })
      .catch(err => res.status(400).send(err));
  },

  getMe(req, res) {
    res.status(200).send(req.user);
  }
};
