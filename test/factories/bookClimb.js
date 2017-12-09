const BookClimb = require('../../src/models').BookClimb;

module.exports = factory => {
  const bookClimb = factory.define('bookClimb', BookClimb, () => {
    return {
      climbId: factory.assoc('climb', 'id'),
      bookId: factory.assoc('book', 'id'),
    };
  });
  return bookClimb;
};
