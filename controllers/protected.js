const User = require('../models/User')
const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()

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

module.exports = router
