const regionsController = require("../controllers").regions;
const routesController = require("../controllers").routes;
const usersController = require("../controllers").users;
const authenticate = require("../middlewares/authenticate").authenticate;

module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "region api"
    })
  );

  app.post("/api/regions", regionsController.create);
  app.get("/api/regions", authenticate, regionsController.list);
  app.get("/api/regions/:regionId", regionsController.retrieve);
  app.put("/api/regions/:regionId", regionsController.update);
  app.delete("/api/regions/:regionId", regionsController.delete);

  app.get("/api/regions/:regionId/routes/:routeId", routesController.retrieve);
  app.post("/api/regions/:regionId/routes", routesController.create);
  app.put("/api/regions/:regionId/routes/:routeId", routesController.update);
  app.delete("/api/regions/:regionId/routes/:routeId", routesController.delete);

  app.post("/signup", usersController.signUp);
  app.post("/login", usersController.login);
  app.get("/users/me", authenticate, usersController.getMe);
};
