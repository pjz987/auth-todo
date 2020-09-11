const mongoose = require('mongoose')
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
    required: false
  }
})

todoSchema.statics.register = async function (text, user, completed) {
  const todo = new this()
  todo.text = text
  todo.completed = completed
  todo.user = user
  await todo.save()
  return todo
}

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
