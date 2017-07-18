// require mongoose & setup Schema constructor
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// document schema declaration

let TodoSchema = new Schema({
  task: String,
  description: String
});

// creating model based on Schema
let Todo = mongoose.model('ToDo', TodoSchema);

// export the model for usage outside this file.
module.exports = Todo;
