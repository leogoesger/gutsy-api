const AuthorBook = require("../models").AuthorBook;

module.exports = {
  create(req, res) {
    return AuthorBook.create(req.body)
      .then(authorBooks => res.status(201).send(authorBooks))
      .catch(err => res.status(400).send(err));
  }
};
