const UserRoute = require('../../src/models').UserRoute;

module.exports = factory => {
  const userRoute = factory.define('userRoute', UserRoute, () => {
    return {
      userId: factory.assoc('user', 'id'),
      routeId: factory.assoc('route', 'id'),
    };
  });
  return userRoute;
};
