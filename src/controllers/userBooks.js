const UserBook = require("../models").UserBook;

module.exports = {
  create(req, res) {
    return UserBook.create({
      userId: req.body.userId,
      bookId: req.body.bookId
    })
      .then(userBook => res.status(201).send(userBook))
      .catch(err => res.status(400).send(err));
  }
};
