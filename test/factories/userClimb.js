const UserClimb = require('../../src/models').UserClimb;

module.exports = factory => {
  const userClimb = factory.define('userClimb', UserClimb, () => {
    return {
      userId: factory.assoc('user', 'id'),
      climbId: factory.assoc('climb', 'id'),
      userClimbStatusId: factory.assoc('userClimbStatus', 'id'),
    };
  });
  return userClimb;
};
