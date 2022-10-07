const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongophonebook.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
let nameInput = process.argv[3];
let numberInput = process.argv[4];

const url = `mongodb+srv://phonebookdb:${password}@cluster0.um2252f.mongodb.net/?retryWrites=true&w=majority`;

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phonebook = mongoose.model("Phonebook", phonebookSchema);

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to DB");
    const entry = new Phonebook({
      name: nameInput,
      number: numberInput,
    });
    return entry.save();
  })
  .then(() => {
    console.log(`added ${nameInput} number ${numberInput} to phonebook`);
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));
