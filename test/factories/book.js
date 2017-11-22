const Book = require('../../src/models').Book;

module.exports = factory => {
  const book = factory.define('book', Book, () => {
    return {
      title: factory.chance('first'),
      description: factory.chance('sentence', {words: 5}),
      price: '33.49',
    };
  });
  return book;
};
