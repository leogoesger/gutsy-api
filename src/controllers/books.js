const Op = require('sequelize').Op;
const Book = require('../models').Book;
const Climb = require('../models').Climb;
const Author = require('../models').Author;

module.exports = {
  create(req, res) {
    return Book.create(req.body)
      .then(book => res.status(201).send(book))
      .catch(err => res.status(400).send(err));
  },

  list(req, res) {
    return Book.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Author,
          foreignKey: 'authorId',
          as: 'authors',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'email'],
          },
        },
      ],
    })
      .then(books => res.status(200).send(books))
      .catch(err => res.status(400).send(err));
  },

  show(req, res) {
    return Book.findById(req.params.bookId, {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Author,
          foreignKey: 'authorId',
          as: 'authors',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'email'],
          },
        },
      ],
    })
      .then(book => res.status(200).send(book))
      .catch(err => res.status(400).send(err));
  },

  update(req, res) {
    return Book.findById(req.params.bookId, {
      include: [{model: Climb, as: 'climbs'}],
    })
      .then(book => {
        if (!book) {
          return res.status(404).send({message: 'Book not found'});
        }
        return book
          .update(req.body, {fields: Object.keys(req.body)})
          .then(() => res.status(200).send(book))
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  },

  delete(req, res) {
    return Book.findById(req.params.bookId)
      .then(book => {
        if (!book) {
          return res.status(404).send({
            message: 'Book not found',
          });
        }
        return book
          .destroy()
          .then(() => res.status(204).send({message: 'deleted item'}))
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  },

  search(req, res) {
    return Book.findAll({
      where: {
        title: {
          [Op.iLike]: `%${req.body.title}%`,
        },
      },
    }).then(books => {
      if (!books) {
        return res.status(404).send({message: 'Book not found'});
      }
      return res.status(200).send(books);
    });
  },
};
