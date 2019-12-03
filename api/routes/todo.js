const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const User = require('../models/User');
const checkAuth = require('../middleware/checkAuth');
const shortId = require('shortid');

router.post('/create', checkAuth, (req, res) => {
  const { title } = req.body;
  const { email, firstName, lastName } = req.userData;
  User.findOne({ email })
  .then(user => {
    const todo = new Todo({
      user_id: user._id,
      id: shortId.generate(),
      title,
    });
    todo.save()
    .then(doc => {
      console.log(doc);
      res.status(200).json({
        message: `Todo saved successfully`,
        todo: doc
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: `An error ${err}`
      });
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});


router.get('/myTodo', checkAuth, (req, res) => {
  const { email, firstName, lastName } = req.userData;
  User.findOne({ email })
  .then(user => {
    Todo.find({ user_id : user._id })
    .then(todos => {
      res.status(200).json(todos);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

router.post('/delete:id', checkAuth, (req, res) => {
  const { email } = req.userData;
  const id = req.params.id;
  Todo.deleteOne({ id })
  .then(todo => {
    console.log(todo);
    User.findOne({ email })
    .then(user => {
      console.log(user);
      Todo.find(user._id)
      .then(todos => {

      })
      .catch(err => {
        console.log(err);
        res.status(404).json({
          error:err
        })
      })
    })
    .catch(err => {
      console.log(err);
      res.status(401).json({
        error: err
      });
    })
  })
  .catch(err => {
    console.log(err);
    res.status(404).json({
      error: err
    })
  })
})

module.exports = router;