const express = require('express');
const app = express();
const Db = require('./config/database');
const cookieParser = require('cookie-parser');

//Routes
const signup = require('./api/routes/signup');
const login = require('./api/routes/login');
const todo = require('./api/routes/todo');
const logout = require('./api/routes/logout');

//Forwarding requests to the routes

app.use(express.json());
app.use(cookieParser());

app.use('/signup', signup);
app.use('/login', login);
app.use('/todo', todo);
app.use('/logout', logout);

Db();

const port = process.env.PORT || 3000 ;
app.listen(port, () => console.log(`Listening on port ${port}`));