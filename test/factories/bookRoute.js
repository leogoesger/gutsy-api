const BookRoute = require('../../src/models').BookRoute;

module.exports = factory => {
  const bookRoute = factory.define('bookRoute', BookRoute, () => {
    return {
      routeId: factory.assoc('route', 'id'),
      bookId: factory.assoc('book', 'id'),
    };
  });
  return bookRoute;
};
