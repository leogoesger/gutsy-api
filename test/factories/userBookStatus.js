const UserBookStatus = require('../../src/models').UserBookStatus;

module.exports = factory => {
  const userBookStatus = factory.define(
    'userBookStatus',
    UserBookStatus,
    () => {
      return {
        statusName: factory.chance('word'),
      };
    }
  );
  return userBookStatus;
};
