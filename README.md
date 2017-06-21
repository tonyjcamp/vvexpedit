# vvexpedit
Virtual Vinyl Expedit

### Using the Discogs API and the Disconnect Node Library
https://www.discogs.com/developers/#page:home
https://github.com/bartve/disconnect

You will need to create a variables.env file with your discogs api key and secret
DISCOGS_KEY=
DISCOGS_SECRET=


###Basic flow, for now:
  Search album, artist, or song
  Return list of results
    Ability to add to collection from results page
    Results click into details
      Use detail view
      display artist, album details
      add artist to collection


  View my collection
    total records
    view details for each record
      Use detail view
      remove from collection
