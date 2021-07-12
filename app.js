const express = require("express");
const app = express();
const port = 5000;
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

app.use(cors());

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req, res, next) => {
  const error = new Error("Resource Not Found");
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);

function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.statusCode || 500);
  res.send(err.message);
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
