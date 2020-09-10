const mongoose = require('mongoose')
const User = require('./User')
const { Schema } = mongoose
const { ObjectId } = mongoose.Schema.Types

const todoSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
