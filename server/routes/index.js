const authenticate = require("../middlewares/authenticate").authenticate;

const regionsController = require("../controllers").regions;
const routesController = require("../controllers").routes;
const usersController = require("../controllers").users;
const areasController = require("../controllers").areas;

module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "region api"
    })
  );

  app.post("/api/regions", regionsController.create);
  app.get("/api/regions", regionsController.list);
  app.get("/api/regions/:regionId", regionsController.show);
  app.put("/api/regions/:regionId", regionsController.update);
  app.delete("/api/regions/:regionId", regionsController.delete);

  app.post("/api/areas", areasController.create);
  app.get("/api/areas", areasController.list);
  app.get("/api/areas/:areaId", areasController.show);
  app.put("/api/areas/:areaId", areasController.update);
  app.delete("/api/areas/:areaId", areasController.delete);

  app.post("/api/routes", routesController.create);
  app.get("/api/routes/:routeId", routesController.show);
  app.put("/api/routes/:routeId", routesController.update);
  app.delete("/api/routes/:routeId", routesController.delete);

  app.post("/signup", usersController.signUp);
  app.post("/login", usersController.login);
  app.get("/users/me", authenticate, usersController.getMe);
};
