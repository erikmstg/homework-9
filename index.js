const express = require("express");
const pool = require("./config");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const morgan = require("morgan");

const app = express();
const port = 5000;

pool.connect((err, result) => {
  if (!err) {
    console.log("connected to database", result.database);

    app.use(morgan("tiny"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(routes);
    app.use(errorHandler);

    app.listen(port, () => {
      console.log("Running with port", port);
    });
  } else {
    console.log(err);
  }
});
