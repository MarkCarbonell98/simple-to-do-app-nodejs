const express = require('express');
const todoController = require('./controllers/todoController.js')

const app = express();
//mvc arquitecture === model (todos, users), controllers (controlls the app sections), view (template files)

//set up templates engine
app.set('view engine', 'ejs');

//loading static files (styles), it will be applied to all pages as it has no route
app.use(express.static('./public'));

//fire controllers
todoController(app);

app.listen(3000);
console.log('app is running on port 3000');