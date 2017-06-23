require('dotenv').config({ path: 'variables.env' })

const express = require('express')
const http = require('http')
const path = require('path')
const jade = require('jade')
const bodyParser = require('body-parser')
const _ = require('lodash')
const routes = require('./routes/index')
const Discogs = require('disconnect').Client

app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// pass variables to our templates + all requests
app.use((req, res, next) => {
  next();
})

app.use('/', routes)

app.listen(4444)
