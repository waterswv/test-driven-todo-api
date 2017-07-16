// require express and other modules
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({
  extended: true
}));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [{
    _id: 7,
    task: 'Laundry',
    description: 'Wash clothes'
  },
  {
    _id: 27,
    task: 'Grocery Shopping',
    description: 'Buy dinner for this week'
  },
  {
    _id: 44,
    task: 'Homework',
    description: 'Make this app super awesome!'
  }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */

  // this retrieves the serach term query and places it into a variable.
  var theSearch = req.query.q.toLowerCase();
  console.log("The search term is " + theSearch);

  // This uses filter searches through the object array it then returns an array of ...
  // ..objects that have a matching toLowerCase task that includes the string
  var myIndexes = todos.filter(function(todo) {
    return (todo.task.toLowerCase().includes(theSearch))});
  console.log(myIndexes);

  // this returns the array with data added as property to the object. 
  res.json({data:myIndexes});
  console.log("My array is " + myIndexes);


});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
  var myData = {
    data: todos
  };
  res.json(myData);
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */

  // Pulls the form inputs from the form and assigns to variables
  var myTask = req.body.task;
  console.log("The Task is" + myTask);
  var myDesc = req.body.description;
  console.log("The Task is" + myDesc);

  // finds the last item in the list array, pulls the ID & increments it by 1 for new item ID
  var myIndex = todos.length - 1;
  var myId = parseInt(todos[myIndex]._id);
  var newId = myId + 1;
  console.log(newId);

  // place new to do item in object
  var myToDo = {
    _id: newId,
    task: myTask,
    description: myDesc
  };
  console.log(myToDo);

  //pushes new object into array
  todos.push(myToDo);

  //returns new object to response
  res.json(myToDo);

});

app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
  var toDoId = parseInt(req.params.id);
  console.log("I've assigned my first toDoId to " + toDoId);

  //this is my callback function that will be used in conjunction with the .filter() method
  function isId(item) {
    if (toDoId === item._id) {
      console.log("this is the item.id in isId function " + item._id);
      return true;
    }
  }

  // this is creating my new array using the .filter method which includes a callback function
  var myData = todos.filter(isId);
  console.log("This is myData at the end " + myData[0]);

  // this is the response data sent back
  res.json(myData[0]);
}); // closing the endpoint

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */

  // This gets my id and converts it into a number.
  var toDoId = parseInt(req.params.id);
  console.log("This is my ID converted to a number " + toDoId);

  // This pulls the form inputs from the form and assigns to variables
  var myTask = req.body.task;
  console.log("The Task new task is " + myTask);
  var myDesc = req.body.description;
  console.log("The new description is " + myDesc);

  //  .map finds all of the _ids in the function ... then we use .indexOf() to..
  // get the index of the matching _id which is assingned to myIndex.
  var myIndex = todos.map(function(e) {
    return e._id;
  }).indexOf(toDoId);
  console.log("The index position to update the data is " + myIndex);

  //updates changed data into seleced object inside array
  todos[myIndex].description = myDesc;
  todos[myIndex].task = myTask;

  //returns changed object to response
  res.json(todos[myIndex]);

});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */

  var toDoId = parseInt(req.params.id);
  console.log("I've assigned my first toDoId to " + toDoId);

  //  .map finds all of the _ids in the function ... then we use .indexOf() to..
  // get the index of the matching _id which is assingned to myIndex.
  // these 2 statements could be combined to reduce code, but I wrote them seperately to test functionality.
  var indexArr = todos.map(function(e) {
    return e._id;
  })
  console.log(indexArr);
  var myIndex = indexArr.indexOf(toDoId);
  console.log("My index is " + myIndex);

  // use .splice() to cut the object in the myIndex position.
  myData = todos.splice(myIndex, 1);
  console.log("This is myData at the end " + myData);

  // this is the response data sent back which is the object that was cut in this scenario.
  res.json(myData[0]);

});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
