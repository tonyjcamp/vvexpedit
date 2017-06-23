exports.getArtist = (res, id) => {
  return res.locals.db.getArtist(id).then((data) => {
    return data
  })
}

exports.getArtistReleases = (res, id) => {
  console.log(res)
  return res.locals.db.getArtistReleases(id).then( (data) => {
    return data
  })
}