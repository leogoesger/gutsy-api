const locationsController = require("../controllers").locations;
const routesController = require("../controllers").routes;

module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "location api",
    })
  );

  app.post("/api/locations", locationsController.create);
  app.get("/api/locations", locationsController.list);
  app.get("/api/locations/:locationId", locationsController.retrieve);
  app.put("/api/locations/:locationId", locationsController.update);
  app.delete("/api/locations/:locationId", locationsController.delete);

  app.get(
    "/api/locations/:locationId/routes/:routeId",
    routesController.retrieve
  );
  app.post("/api/locations/:locationId/routes", routesController.create);
  app.put(
    "/api/locations/:locationId/routes/:routeId",
    routesController.update
  );
  app.delete(
    "/api/locations/:locationId/routes/:routeId",
    routesController.delete
  );
};
