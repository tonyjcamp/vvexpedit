const passport = require('passport')
const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.login = passport.authenticate('local', {
  failureRedirect: '/loginForm',
  failureFlash: 'Failed Login',
  successRedirect: '/account',
  successFlash: 'You are logged in'
});