const passport = require('passport')

exports.login = passport.authenticate('local', {
	failureRedirect: '/loginForm',
	failureFlash: 'Failed Login',
	successRedirect: '/account',
	successFlash: 'You are logged in'
})
