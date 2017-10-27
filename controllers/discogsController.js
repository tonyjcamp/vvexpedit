const discogService = require('../services/discog-service')

exports.home = (req, res) => {
  // console.log(req.isAuthenticated)
    res.render('home')
}

exports.search = (req, res) => {
  const {q} = req.query
  const page = req.query.page ? req.query.page : 1

  discogService.search(q, page).then( (results) => {
    res.render('results', {results, q})
  })
}

exports.getReleaseDetails = (req, res) => {
  const {id} = req.params

  discogService.getReleaseDetails(id).then((details) => {
    res.render('release', details)
  })
}

exports.getMasterDetails = (req, res) => {
  const {id} = req.params

  discogService.getMasterDetails(id).then((data) => {
    res.render('master', data)
  })

}

exports.getArtistDetails = (req, res) => {
  const {id} = req.params

  discogService.getArtist(id).then( (artist) => {
    res.render('artist', artist)
  })
}

// Discogs USER specific functions
exports.getCollectionFolders = async (req, res) => {
  const accountData = await discogService.getCollectionFolders(req)
  const {data, collectionFolders} = accountData
  res.render('folders', {data, folders: collectionFolders.folders})
}

exports.getFolder = (req, res) => {
  discogService.getFolder(req.session.discogsAccount, req.params.id).then( (folder) => {
    const {releases} = folder
    res.render('folder', {releases})
  })
}