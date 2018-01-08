const UserBook = require('../models').UserBook;

module.exports = {
  findOrCreate(req, res) {
    if (!req.body.userId || !req.body.bookId) {
      return res.status(400).send('Request Failed!');
    }
    return UserBook.findOrCreate({
      where: {userId: req.body.userId, bookId: req.body.bookId},
      defaults: {userBookStatusId: req.body.userBookStatusId},
    })
      .spread((userBook, created) => {
        if (created) {
          return res.status(201).send(userBook);
        }
        return userBook
          .update(req.body, {userBookStatusId: req.body.userBookStatusId})
          .then(updateUserBook => res.status(200).send(updateUserBook));
      })
      .catch(() => res.status(400).send({message: 'Could not find a match!'}));
  },
};
