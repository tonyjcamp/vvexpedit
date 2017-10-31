if (process.env.NODE_ENV === 'DEVELOPMENT') {
  require('dotenv').config({
    path: 'variables.env'
  })
}

const _ = require('lodash')
const express = require('express')
const http = require('http')
const path = require('path')
const jade = require('jade')
const bodyParser = require('body-parser')
const session = require('express-session')
const morgan = require('morgan')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
require('./models/User')
const expressValidator = require('express-validator')
const routes = require('./routes/index')
const flash = require('connect-flash')
const PORT = process.env.PORT || 4444
const HOST = '0.0.0.0'

mongoose.connect(process.env.DATABASE, {
  useMongoClient: true
})
mongoose.Promise = global.Promise
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`)
})

app = express()

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan('tiny'))
}

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(expressValidator())
app.use(flash())

app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
)

// pass variables to our templates + all requests
app.use(require('./middlewares/flash'))

app.use('/', routes)
app.listen(PORT, HOST)
