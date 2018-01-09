const UserClimbStatus = require('../../src/models').UserClimbStatus;

module.exports = factory => {
  const userClimbStatus = factory.define(
    'userClimbStatus',
    UserClimbStatus,
    () => {
      return {
        statusName: factory.chance('word'),
      };
    }
  );
  return userClimbStatus;
};
