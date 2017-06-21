exports.home = (req, res) => {
  res.render('home')
}

exports.search = (req, res) => {
  const q = req.query.q
  const page = req.query.page ? req.query.page : 1
  const options = {type: ['artist'], page, per_page: 10}

  res.locals.db.search(q, options).then((data) => {
    res.render('results', {data, q, page} )
  })
}

exports.getReleaseDetails = (req, res) => {
  const id = req.params.id

  res.locals.db.getRelease(id).then((data) => {
    res.render('release', {'data': data} )
  })
}

exports.getMasterDetails = (req, res) => {
  const id = req.params.id

  res.locals.db.getMaster(id).then((data) => {
    res.render('master', {'data': data, 'images': data.images})
  })

}

exports.getArtistDetails = (req, res) => {
  const id = req.params.id

  res.locals.db.getArtist(id).then((data) => {
    return data
  }).then( (data) => {
    const artistData = data
    res.locals.db.getArtistReleases(artistData.id).then( (releaseData) => {
      res.render('artist', {
        'data': artistData,
        'images': artistData.images,
        'members': artistData.members,
        'releases': releaseData.releases
      })
    })
  })

}