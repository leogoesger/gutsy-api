const AuthorBook = require('../../src/models').AuthorBook;

module.exports = factory => {
  const authorBook = factory.define('authorBook', AuthorBook, () => {
    return {
      authorId: factory.assoc('author', 'id'),
      bookId: factory.assoc('book', 'id'),
    };
  });
  return authorBook;
};
