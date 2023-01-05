require("dotenv").config();
const { response } = require("express");
const express = require("express");
const app = express();
const http = require("http");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const server = http.createServer(app);
const Phonebook = require("./models/entry");
app.use(cors());
app.use(express.static("build"));
app.use(express.json());

server.listen(config.PORT, () => {
  logger.info(`Server is RUNNING on port ${config.PORT}`);
});
// app.use(requestLogger);
// const url = `mongodb+srv://phonebookdb:lrszOtLHZ7eME4Sl@cluster0.um2252f.mongodb.net/?retryWrites=true&w=majority`;

// let entries = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :response-time[digits] :body"));

app.get("/", (request, response) => {
  response.send("<h1>Hello World!<h1>");
});

app.get("/api/entries", (request, response) => {
  Phonebook.find({}).then((entries) => response.json(entries));
});

app.get("/info", (request, response) => {
  response.send(
    `Phonebook has info for ${entries.length} people <br/> ${new Date()}`
  );
});

// app.get("/api/entries/:id", (request, response) => {
//   Phonebook.findById(request.params.id).then((entry) => {
//     response.json(entry);
//   });
// });

app.get("/api/entries/:id", (request, response, next) => {
  Phonebook.findById(request.params.id)
    .then((entry) => {
      if (entry) {
        response.json(entry);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.delete("/api/entries/:id", (request, response, next) => {
  Phonebook.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// const generateId = () => {
//   const maxId = entries.length > 0 ? Math.max(...entries.map((n) => n.id)) : 0;
//   return maxId + 1;
// };

app.post("/api/entries", (request, response, next) => {
  const body = request.body;

  const entry = new Phonebook({
    name: body.name,
    number: body.number,
  });

  entry
    .save()
    .then((savedEntry) => {
      response.json(savedEntry);
    })
    .catch((error) => next(error));
});

// const accessLogStream = fs.createWriteStream(path.join(__C:\Users\PuneetKittur\fullstack_exercises\newPhonebook\logs,'access.log'),{flags:'a'})
const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformed id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
