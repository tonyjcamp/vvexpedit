const mongoose = require('mongoose')
const User = mongoose.model('User')
const promisify = require('es6-promisify')

exports.loginForm = (req, res) => {
  res.render('login')
}

exports.registerForm = (req, res) => {
  res.render('register')
}

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name')
  req.checkBody('name', 'Name is required!').notEmpty()
  req.checkBody('email', 'Email is not valid!').isEmail()
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  })
  req.checkBody('password', 'Password is required!').notEmpty()
  req.checkBody('password-confirm', 'Confirm Password is required')
  req.checkBody('password-confirm', 'Oops! Your passwords do not match')
    .equals(req.body.password)

  const errors = req.validationErrors()
  if (errors) {
    console.log(errors)
    res.end('errors')
  }

  next()
}

exports.register = async (req, res, next) => {
  try {
    const { email, name, password } = req.body
    const user = new User({ email, name })
    const register = promisify(User.register, User)
    await register(user, password)
  } catch (error) {
    next(error)
  }
}
