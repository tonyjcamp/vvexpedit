const Discogs = require('disconnect').Client

// Authenticate by consumer key and secret
// Need to have variables.env created
const dis = new Discogs({
  consumerKey: process.env.DISCOGS_KEY,
  consumerSecret: process.env.DISCOGS_SECRET
})

const db = dis.database()

exports.search = async (q, page) => {
  const options = {type: ['artist'], page, per_page: 10}
  const results = await db.search(q, options)
  return results
}

exports.getArtist = async (id) => {
  const data = await db.getArtist(id)
  const releaseData = await db.getArtistReleases(data.id)
  const {releases} = releaseData
  return {data, releases}
}

exports.getReleaseDetails = async (id) => {
  const details = await db.getRelease(id)
  return {details}
}

exports.getMasterDetails = async (id) => {
  const data = await db.getMaster(id)
  const {images} = data
  return {data, images}
}

// change the expected parameter to be req.session.discogsAccount
// instead of the whole req
exports.getCollectionFolders = async (req) => {
  const discogsUser = new Discogs(req.session.discogsAccount)
  const userCollection = discogsUser.user().collection()
  const data = await discogsUser.getIdentity()
  const collectionFolders = await userCollection.getFolders(data.username)
  return {data, collectionFolders}
}

exports.getFolder = async (discogsAccount, folderId) => {
  const discogsUser = new Discogs(discogsAccount)
  const userCollection = discogsUser.user().collection()
  const data = await discogsUser.getIdentity()
  const folder = await userCollection.getReleases(data.username, folderId)
  return folder
}