const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("entries are returned as json", async () => {
  await api
    .get("/api/entries")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 80000);

afterAll(async () => {
  await mongoose.connection.close();
});
