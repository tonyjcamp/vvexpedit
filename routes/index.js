const express = require('express');
const router = express.Router();
const discogsController = require('../controllers/discogsController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const Discogs = require('disconnect').Client;
// const passport = require('passport')
// const OAuthStrategy = require('passport-oauth').OAuthStrategy

router.get('/', discogsController.home);
router.get('/search', discogsController.search);
router.get('/details/release/:id', discogsController.getReleaseDetails);
router.get('/details/master/:id', discogsController.getMasterDetails);
router.get('/details/artist/:id', discogsController.getArtistDetails);

router.get('/register', userController.registerForm);
router.post('/register', userController.validateRegister, userController.register);

router.get('/login', userController.loginForm);
router.post('/login', authController.login);

router.get('/authorize', function(req, res) {
	const oAuth = new Discogs().oauth();

	oAuth.getRequestToken(
		process.env.DISCOGS_KEY,
		process.env.DISCOGS_SECRET,
		'http://localhost:4444/authorized',
		function(err, requestData) {
			// Persist "requestData" here so that the callback handler can
			// access it later after returning from the authorize url
			req.session.discogs = requestData;
			res.redirect(requestData.authorizeUrl);
			// console.log(requestData, ' inside authorize')
		}
	);
});

router.get('/authorized', (req, res) => {
	// console.log(req.session, ' inside of authorized')
	dis = new Discogs(req.session.discogs).oauth();

	dis.getAccessToken(
		req.query.oauth_verifier, // Verification code sent back by Discogs
		function(err, accessData) {
			req.session.discogsAccount = accessData;
			// console.log(req.session.discogs, ' inside of getAccessToken call')
			res.redirect('/account');
		}
	);
});

router.get('/account', (req, res) => {
	if (!req.session.discogsAccount) {
		res.redirect('/authorize');
	} else {
		discogsController.getCollectionFolders(req, res);
	}
});

router.get('/account/folder/:id', discogsController.getFolder);

module.exports = router;
