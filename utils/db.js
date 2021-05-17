const algoliasearch = require('algoliasearch')
const config = require('./config')

let {applicationId, adminApiKey} = config.algoliaConfig

const db = algoliasearch(applicationId, adminApiKey)

module.exports = db