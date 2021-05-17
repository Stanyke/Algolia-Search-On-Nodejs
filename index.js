const express = require('express')
const cors = require('cors')
const app = express()
const indexRoutes = require('./routes/index')
const config = require('./utils/config')

app.use(cors())
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ limit: '100mb', extended: true }))

indexRoutes(app)

const port = process.env.PORT || config.localPort

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})