const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const mongodbErrorHandler = require('mongoose-mongodb-errors')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		validate: [ validator.isEmail, 'Invalid Email Address' ],
		required: 'Please enter email address',
		index: true
	},
	name: {
		type: String,
		required: 'Please enter your name',
		trim: true
	},
	resetPasswordToken: { type: String, trim: true },
	resetPasswordExpires: { type: Date },
	oauthToken: { type: String, trim: true },
	oauthTokenSecret: { type: String, trim: true }
})

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
userSchema.plugin(mongodbErrorHandler)
module.exports = mongoose.model('User', userSchema)
