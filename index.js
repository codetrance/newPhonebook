const { response } = require("express");
const express = require("express");
const app = express();
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

let entries = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :response-time[digits] :body"));

app.get("/", (request, response) => {
  response.send("<h1>Hello World!<h1>");
});

app.get("/api/entries", (request, response) => {
  response.json(entries);
});

app.get("/info", (request, response) => {
  response.send(
    `Phonebook has info for ${entries.length} people <br/> ${new Date()}`
  );
});

app.get("/api/entries/:id", (request, response) => {
  const id = Number(request.params.id);
  const entry = entries.find((entry) => entry.id === id);

  if (entry) {
    response.json(entry);
  } else {
    response.status(404).send("Item not found, please retry with valid ID");
  }
  response.json(entry);
});

app.delete("/api/entries/:id", (request, response) => {
  const id = Number(request.params.id);
  entries = entries.filter((entry) => entry.id !== id);

  response.status(204).end();
});

app.use(express.json());

const generateId = () => {
  const maxId = entries.length > 0 ? Math.max(...entries.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/entries", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  } else if (
    entries
      .map((item) => item.name.toLowerCase())
      .includes(body.name.toLowerCase())
  ) {
    return response.status(400).json({
      error: "name already exists",
    });
  } else {
    const entry = {
      id: generateId(),
      name: body.name,
      number: body.number,
    };
    entries = entries.concat(entry);
    response.json(entry);
  }
});

// const accessLogStream = fs.createWriteStream(path.join(__C:\Users\PuneetKittur\fullstack_exercises\newPhonebook\logs,'access.log'),{flags:'a'})

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
