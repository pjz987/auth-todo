const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const app = express()
const port = 8000

const AuthController = require('./controllers/auth')
const ProtectedController = require('./controllers/protected')

app.use(express.json())
app.use(morgan('tiny'))
app.use('/', AuthController)
app.use('/', ProtectedController)

app.get('/', (req, res) => {
  res.send('hello')
})

const connectDatabase = async (hostname, databaseName) => {
  const database = await mongoose.connect(
    `mongodb://${hostname}/${databaseName}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )

  console.log(`database connected successfully at mongodb://${hostname}/${databaseName} ...`)

  return database
}

app.listen(port, async () => {
  await connectDatabase('localhost', 'auth-demo')
  console.log(`server listening on port ${port}...`)
})
