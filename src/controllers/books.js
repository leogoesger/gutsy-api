const Book = require("../models").Book;
const Route = require("../models").Route;
const Author = require("../models").Author;

module.exports = {
  create(req, res) {
    return Book.create(req.body)
      .then(book => res.status(201).send(book))
      .catch(err => res.status(400).send(err));
  },

  list(req, res) {
    return Book.findAll({
      include: [
        { model: Route, as: "routes" },
        { model: Author, foreignKey: "authorId", as: "authors" }
      ]
    })
      .then(books => res.status(200).send(books))
      .catch(err => res.status(400).send(err));
  },

  show(req, res) {
    return Book.findById(req.params.bookId, {
      include: [
        { model: Route, as: "routes" },
        { model: Author, foreignKey: "authorId", as: "authors" }
      ]
    })
      .then(book => res.status(200).send(book))
      .catch(err => res.status(400).send(err));
  },

  update(req, res) {
    return Book.findById(req.params.bookId, {
      include: [{ model: Route, as: "routes" }]
    })
      .then(book => {
        if (!book) {
          return res.status(400).send({ message: "Book not found" });
        }
        return book
          .update(req.body, { fields: Object.keys(req.body) })
          .then(() => res.status(200).send(book))
          .catch(err => res.status(400).send({ message: "error updating" }));
      })
      .catch(err => res.status(400).send(err));
  },

  delete(req, res) {
    return Book.findById(req.params.bookId)
      .then(book => {
        if (!book) {
          return res.status(400).send({
            message: "no book"
          });
        }
        return book
          .destroy()
          .then(() => res.status(204).send({ message: "deleted item" }))
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  }
};
