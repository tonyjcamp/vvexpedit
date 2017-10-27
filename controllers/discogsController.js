const Discog = require('../services/discog');
const DiscogService = new Discog({
	consumerKey: process.env.DISCOGS_KEY,
	consumerSecret: process.env.DISCOGS_SECRET
});

exports.home = (req, res) => {
	res.render('home');
};

exports.search = async (req, res, next) => {
	try {
		const { q } = req.query;
		const page = req.query.page ? req.query.page : 1;
		var results = await DiscogService.search(q, page);
		res.render('results', { results, q });
	} catch (error) {
		next(error);
	}
};

exports.getReleaseDetails = async (req, res, next) => {
	try {
		const { id } = req.params;
		var releaseDetails = await DiscogService.getReleaseDetails(id);
		res.render('release', details);
	} catch (error) {
		next(error);
	}
};

exports.getMasterDetails = async (req, res, next) => {
	try {
		const { id } = req.params;
		var masterDetails = await DiscogService.getMasterDetails(id);
		res.render('master', masterDetails);
	} catch (error) {
		next(error);
	}
};

exports.getArtistDetails = async (req, res, next) => {
	try {
		const { id } = req.params;
		var artist = await DiscogService.getArtist(id);
		res.render('artist', artist);
	} catch (error) {
		next(error);
	}
};

// Discogs USER specific functions
exports.getCollectionFolders = async (req, res, next) => {
	try {
		const accountData = await DiscogService.getCollectionFolders(req);
		const { data, collectionFolders } = accountData;
		res.render('folders', { data, folders: collectionFolders.folders });
	} catch (error) {
		next(error);
	}
};

exports.getFolder = async (req, res, next) => {
	try {
		var folder = await DiscogService.getFolder(req.session.discogsAccount, req.params.id);
		const { releases } = folder;
		res.render('folder', { releases });
	} catch (error) {
		next(error);
	}
};
