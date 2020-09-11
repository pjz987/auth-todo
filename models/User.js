const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { Schema } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true
  }
})

userSchema.virtual('todos', {
  ref: 'Todo',
  localField: '_id',
  foreignField: 'user',
  justOne: false
})

userSchema.methods.sanitize = function () {
  return {
    ...this._doc,
    password: undefined
  }
}

userSchema.statics.signUp = async function (username, password) {
  const user = new this()
  user.username = username
  await user.hashPassword(password)
  await user.save()
  return user
}

userSchema.methods.hashPassword = function (plainText) {
  const user = this
  return bcrypt.hash(plainText, 10).then(hash => {
    user.password = hash
  })
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
