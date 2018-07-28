const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended:false});
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://test:testdatabase1@ds157901.mlab.com:57901/marcoscarbonelldatabase');

// create a schema = this is like a blueprint
const todoSchema = new mongoose.Schema({
      item: String
});

const Todo = mongoose.model('Todo', todoSchema);

// let data = [{item: 'get milk'}, {item:'walk dog'}, {item: 'kick some coding ass'}];

module.exports = (app) => {

      app.get('/todo', (req, res) => {
            //get data from mongoDB and pass it to the view
            Todo.find({}, (err, data) => {
                  if(err) throw err;
                  res.render('todo', {todos: data});
                  
            }) //retrieves all items in todo collection
      });

      app.post('/todo', urlencodedParser, (req, res) => {
            //get data from the view and add it to mongoDB hehehe
            let newTodo = Todo(req.body).save((err,data) => {
                  if (err) throw err;
                  res.json(data);
            });
      });

      app.delete('/todo/:item', (req, res) => {
            //delete the requested item from the database
            Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err,data) => {
                  if (err) throw err;
                  res.json(data);
            });
      });
};

//NoSQL Database are alternative SQL databases
// documents are stored as JSON in a database instead of in tables with rows and columns
// works very good with JavaScript and Node.JS
