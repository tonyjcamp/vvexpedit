const Discogs = require('disconnect').Client;

class DiscogService {
	/**
   * Represents a wrapper around Discog Service.
   * @constructor
   * @param {Object} opts - Must contain consumerKey and consumerSecret
   */
	constructor(opts) {
		if (!opts.consumerKey) throw Error('Consumer Key is Missing');
		if (!opts.consumerSecret) throw Error('Consumer Secret is Missing');

		this.discogsAPI = new Discogs({
			consumerKey: opts.consumerKey,
			consumerSecret: opts.consumerSecret
		});
		this.db = this.discogsAPI.database();
	}

	/**
   * This returns Promise of array of results for given query and page from DiscogAPI
   * 
   * @param {string} q - Query
   * @param {number} page - Page Number
   * @returns {Object[]} results
   */
	async search(q, page) {
		try {
			const options = { type: [ 'artist' ], page, per_page: 10 };
			const results = await this.db.search(q, options);
			return results;
		} catch (error) {
			throw error;
		}
	}

	async getArtist(id) {
		try {
			const data = await this.db.getArtist(id);
			const releaseData = await this.db.getArtistReleases(data.id);
			const { releases } = releaseData;
			return { data, releases };
		} catch (error) {
			throw error;
		}
	}

	/**
   * Gets details of album by id
   * 
   * @param {string} id Id of album
   * @returns {Object} Details of album
   * 
   */
	async getReleaseDetails(id) {
		try {
			const details = await db.getRelease(id);
			return { details };
		} catch (error) {
			throw error;
		}
	}

	async getMasterDetails(id) {
		try {
			const data = await db.getMaster(id);
			const { images } = data;
			return { data, images };
		} catch (error) {
			throw error;
		}
	}

	async getCollectionFolders(req) {
		try {
			const discogsUser = new Discogs(req.session.discogsAccount);
			const userCollection = discogsUser.user().collection();
			const data = await discogsUser.getIdentity();
			const collectionFolders = await userCollection.getFolders(data.username);
			return { data, collectionFolders };
		} catch (error) {
			throw error;
		}
	}

	async getFolder(discogsAccount, folderId) {
		try {
			const discogsUser = new Discogs(discogsAccount);
			const userCollection = discogsUser.user().collection();
			const data = await discogsUser.getIdentity();
			const folder = await userCollection.getReleases(data.username, folderId);
			return folder;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = DiscogService;
