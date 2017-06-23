const discogService = require('./discog-service')

exports.home = (req, res) => {
  res.render('home')
}

exports.search = (req, res) => {
  const { q } = req.query
  const page = req.query.page ? req.query.page : 1

  discogService.search(q, page).then( (results) => {
    res.render('results', results)
  })
}

exports.getReleaseDetails = (req, res) => {
  const id = req.params.id

  discogService.getReleaseDetails(id).then((details) => {
    res.render('release', details )
  })
}

exports.getMasterDetails = (req, res) => {
  const id = req.params.id

  discogService.getMasterDetails(id).then((data) => {
    res.render('master', data)
  })

}

exports.getArtistDetails = (req, res) => {
  const { id } = req.params

  discogService.getArtist(id).then( (artist) => {
    res.render('artist', artist)
  })
}