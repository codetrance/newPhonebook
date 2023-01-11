const notesRouter = require("express").Router();
const { response } = require("express");
const morgan = require("morgan");
const Phonebook = require("../models/entry");

morgan.token("body", (req) => JSON.stringify(req.body));
notesRouter.use(morgan(":method :url :status :response-time[digits] :body"));

notesRouter.get("/", (request, response) => {
  Phonebook.find({}).then((entries) => {
    response.json(entries);
  });
});

notesRouter.get("/:id", (request, response, next) => {
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

notesRouter.post("/", (request, response, next) => {
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

notesRouter.delete("/:id", (request, response, next) => {
  Phonebook.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

notesRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const entry = {
    name: body.name,
    number: body.number,
  };

  Phonebook.findByIdAndUpdate(request.params.id, entry, { new: true })
    .then((updatedEntry) => {
      response.json(updatedEntry);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
