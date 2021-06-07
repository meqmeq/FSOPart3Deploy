require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// This is where I get the model from notes
const Note = require("./models/note");

app.use(express.static("build")); // This part of the code take the static content from the production build and lets our webapp intercommunicate with the front and back end
app.use(cors());

app.use(express.json());

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!

const url = process.env.PORT;

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" });
//   response.end(JSON.stringify(notes));
// });

// const PORT = 3001;
// app.listen(PORT);
// console.log(`Server running on port ${PORT}`);

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

// app.get("/api/notes/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const note = notes.find((note) => {
//     console.log(note.id, typeof note.id, id, typeof id, note.id === id);
//     return note.id === id;
//   });

//   console.log(note);
//   if (note) {
//     response.json(note);
//   } else {
//     response.status(404).end();
//   }
// });

app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

// app.post("/api/notes", (request, response) => {
//   const note = request.body;
//   console.log(note);
//   response.json(note);
// });

// Post Method

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

// app.post("/api/notes", (request, response) => {
//   const body = request.body;

//   if (!body.content) {
//     return response.status(400).json({
//       error: "content missing",
//     });
//   }

//   const note = {
//     content: body.content,
//     important: body.important || false,
//     date: new Date(),
//     id: generateId(),
//   };

//   notes = notes.concat(note);

//   response.json(note);
// });

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
