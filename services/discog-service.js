const Discogs = require('disconnect').Client

// Authenticate by consumer key and secret
// Need to have variables.env created
const dis = new Discogs({
  consumerKey: process.env.DISCOGS_KEY,
  consumerSecret: process.env.DISCOGS_SECRET
})

const db = dis.database()

exports.search = (q, page) => {
  const options = {type: ['artist'], page, per_page: 10}

  return db.search(q, options).then( (results) => {
    return results
  })
}

exports.getArtist = (id) => {

  return db.getArtist(id).then((data) => {
    const {id} = data

    return db.getArtistReleases(id).then( (releaseData) => {
      const {releases} = releaseData
      return {data, releases}
    })

  })
}

exports.getReleaseDetails = (id) => {
  return db.getRelease(id).then((details) => {
    return {details}
  })
}

exports.getMasterDetails = (id) => {
  return db.getMaster(id).then((data) => {
    const {images} = data
    return {data, images}
  })
}
