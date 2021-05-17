const dotenv = require('dotenv')

dotenv.config()

const {
    PORT,
    APPLICATION_ID,
    ADMIN_API_KEY
} = process.env


module.exports = {
    localPort: PORT,
    algoliaConfig: {
        applicationId: APPLICATION_ID,
        adminApiKey: ADMIN_API_KEY
    }
}