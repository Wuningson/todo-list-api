const express = require('express');
const app = express();
const Db = require('./config/database');

//Routes
const signup = require('./api/routes/signup');
const login = require('./api/routes/login');
const todo = require('./api/routes/todo');

//Forwarding requests to the routes
app.use('/signup', signup);
app.use('/login', login);
app.use('/todo', todo);

Db();

const port = process.env.PORT || 3000 ;
app.listen(port, () => console.log(`Listening on port ${port}`));