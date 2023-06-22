const mongoose = require("mongoose");

const express = require("express");

const app = express();
const cors = require("cors");
const config = require("./utils/config");
const notesRouter = require("./controllers/phone");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

// const password = process.argv[2];

// const url = `mongodb+srv://phonebookdb:${password}@cluster0.um2252f.mongodb.net/?retryWrites=true&w=majority`;

logger.info("connecting to .... New format", config.MONGODB_URI);
console.log("Step 2 executed");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB New format");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB New format", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/entries", notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
