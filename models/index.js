
// this brings mongoose into our project environment
let mongoose = require('mongoose'); // when file extension "./" is omitted from require it signifies to node that the location is in node modules

// this connects us to the database at the localhost location
mongoose.connect(process.env.DBPORT ||'mongodb://localhost/todo-app');

// initializing variable to use model data exported from require url file.
let Todo = require('./todo.js'); // the file extension i.e. ".js" is optional

let db = {
  Todo: Todo
}

module.exports = db;

// this is another way to initialize
// let db = {
//   Todo: require('./todo');
// } this would also need to have the module.exports line added

// and an even simpler way to export:
// module.exports = {
//     Todo: require('./Todo.js')
// }
