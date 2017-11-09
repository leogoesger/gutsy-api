const User = require("../models").User;

const authenticate = (req, res, next) => {
  const token = req.header("x-auth");
  User.findByToken(token)
    .then(user => {
      if (!user) {
        res.status(401).send({ message: "No user found!" });
      }
      req.user = user;
      req.token = token;
      next();
    })
    .catch(e => {
      res.status(401).send({ message: "Autho did not work!" });
    });
};

module.exports = { authenticate };
