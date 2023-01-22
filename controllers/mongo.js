const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

// const password = process.argv[2];

// const url = `mongodb+srv://phonebookdb:${password}@cluster0.um2252f.mongodb.net/?retryWrites=true&w=majority`;

// mongoose.set("strictQuery", true); This was added to check if the Deprecation error goes away, but there was no luck so commented this out

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

mongoose.connect(url).then(
  Note.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note);
    });
    mongoose.connection.close();
  })
);
