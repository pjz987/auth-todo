const User = require('../models/User')
const Todo = require('../models/Todo')
const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()
// router.use(express.json())

router.get('/hello', (req, res) => {
  const authorization = req.header('Authorization') || ''
  const [type, token] = authorization.split(' ')

  if (type === 'Bearer' && jwt.verify(token, 'CHANGEME!')) {
    const payload = jwt.decode(token, 'CHANGEME!')
    User.findOne({ _id: payload._id }, (err, user) => {
      if (err) return res.status(500).send(err)

      // do something with user

      res.send({ message: 'this is a secret message...', user: user.username })
    })
  } else {
    res.status(401).send('unauthorized')
  }
})

router.get('/todos', async (req, res) => {
  // console.log('get todos')
  const authorization = req.header('Authorization') || ''
  const [type, token] = authorization.split(' ')

  if (type === 'Bearer' && jwt.verify(token, 'CHANGEME!')) {
    const payload = jwt.decode(token, 'CHANGEME!')
    const todos = await Todo.find({ user: payload._id }, err => {
      if (err) return res.status(500).send(err)
    }).populate('todos')
    res.send({ todos })
  } else {
    res.status(401).send('unauthorized')
  }
})

router.post('/todos', (req, res) => {
  // console.log('req.body', req.body)
  // console.log('post todos')
  const authorization = req.header('Authorization') || ''
  const [type, token] = authorization.split(' ')

  if (type === 'Bearer' && jwt.verify(token, 'CHANGEME!')) {
    console.log('we got here')
    const payload = jwt.decode(token, 'CHANGEME!')
    // console.log(payload)

    // async function todos () {
    Todo.register(req.body.text, payload._id, false)
    // }
    res.status(200).send('ok')

    // todos()
  } else {
    res.status(401).send('unauthorized')
  }
})

router.post('/remove', (req, res) => {
  const authorization = req.header('Authorization') || ''
  const [type, token] = authorization.split(' ')

  if (type === 'Bearer' && jwt.verify(token, 'CHANGEME!')) {
    const payload = jwt.decode(token, 'CHANGEME!')
    Todo.deleteOne({ _id: req.body._id }, err => {
      if (err) return res.status(500).send(err)
      res.status(200).send('ok')
    })
  }
})

module.exports = router
