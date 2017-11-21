const Author = require('../../src/models').Author;

module.exports = factory => {
  const author = factory.define('author', Author, () => {
    return {
      firstName: factory.chance('first'),
      lastName: factory.chance('last'),
      email: factory.chance('email', {domain: 'example.com'}),
    };
  });
  return author;
};
