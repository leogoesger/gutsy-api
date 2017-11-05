const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const expressJWT = require("express-jwt");

const app = express();

app.use(logger("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(
//   expressJWT({ secret: "leogoesger" }).unless({
//     path: ["/login", "/api/locations"]
//   })
// );

require("./server/routes")(app);

app.get("*", (req, res) =>
  res.status(200).send({
    message: "App is running"
  })
);

module.exports = app;
