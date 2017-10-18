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

  app.post("/api/locations/:locationId/routes", routesController.create);
};
