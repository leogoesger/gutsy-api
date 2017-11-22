const UserBook = require('../../src/models').UserBook;

module.exports = factory => {
  const userBook = factory.define('userBook', UserBook, () => {
    return {
      userId: factory.assoc('user', 'id'),
      bookId: factory.assoc('book', 'id'),
    };
  });
  return userBook;
};
