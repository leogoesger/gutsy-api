// "use strict";
// module.exports = (sequelize, DataTypes) => {
//   const UserRoute = sequelize.define("UserRoute", {
//     quantity: DataTypes.TEXT,
//     userId: DataTypes.INTEGER,
//     routeId: DataTypes.INTEGER
//   });
//   return UserRoute;
// };

"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserRoute = sequelize.define("UserRoute", {
    quantity: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    routeId: DataTypes.INTEGER
  });

  UserRoute.associate = models => {
    UserRoute.belongsTo(models.User, {
      foreignKey: "userId"
    });
    UserRoute.belongsTo(models.Route, {
      foreignKey: "routeId"
    });
  };
  return UserRoute;
};
