const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models').User;
const Route = require('../models').Route;
const Book = require('../models').Book;

module.exports = {
  signUp(req, res) {
    if (!req.body.email || !req.body.password) {
      res.status(400).send('email not found');
      return;
    }

    User.create(
      Object.assign(req.body, {
        password: bcrypt.hashSync(req.body.password, 10),
      })
    )
      .then(() => {
        const myToken = jwt.sign({email: req.body.email}, 'leogoesger');
        res.status(200).send(myToken);
      })
      .catch(err => res.status(400).send(err));
  },

  login(req, res) {
    if (!req.body.email || !req.body.password) {
      res.status(400).send('email not found');
      return;
    }

    User.find({
      where: {
        email: req.body.email,
      },
    })
      .then(user => {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const myToken = jwt.sign({email: req.body.email}, 'leogoesger');
          res.status(200).json(myToken);
        } else {
          res.status(404).send({message: 'Wrong Password'});
        }
      })
      .catch(err => res.status(400).send(err));
  },

  getMe(req, res) {
    User.findById(req.user.id, {
      include: [
        {model: Route, foreignKey: 'userId', as: 'routes'},
        {model: Book, foreignKey: 'userId', as: 'books'},
      ],
    })
      .then(user => res.status(200).send(user))
      .catch(err => res.status(404).send(err));
  },

  update(req, res) {
    User.findById(req.user.id)
      .then(user => {
        if (!user) {
          return err => res.status(400).send(err);
        }
        return user
          .update(req.body, {fields: Object.keys(req.body)})
          .then(() => res.status(200).send(user))
          .then(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  },
};
