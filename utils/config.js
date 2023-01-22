require("dotenv").config();

const { PORT } = process.env;
const { TEST_MONGODB_URI } = process.env;

// const MONGODB_URI =
//   process.env.NODE_ENV === "test"
//     ? process.env.TEST_MONGODB_URI
//     : process.env.MONGODB_URI;

module.exports = {
  TEST_MONGODB_URI,
  PORT,
};
