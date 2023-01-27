const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Entry = require("../models/entry");

const initialEntries = [
  {
    name: "Test Arto Hellas",
    number: "040-123456",
  },
  {
    name: "Test Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    name: "Test Andy Bramov",
    number: "12-43-234345",
  },
];

beforeEach(async () => {
  await Entry.deleteMany({});
  let entryObject = new Entry(initialEntries[0]);
  await entryObject.save();
  entryObject = new Entry(initialEntries[1]);
  await entryObject.save();
});

test("all entries are returned", async () => {
  const response = await api.get("/api/entries");

  expect(response.body).toHaveLength(initialEntries.length);
});

test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/entries");

  const contents = response.body.map((r) => r.name);
  expect(contents).toContain("Test Ada Lovelace");
});

afterAll(async () => {
  await mongoose.connection.close();
});
