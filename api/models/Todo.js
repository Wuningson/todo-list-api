const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User'
  },
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: String,
    required: true,
    default: false,
  }
});

module.exports = mongoose.model('Todo', todoSchema);