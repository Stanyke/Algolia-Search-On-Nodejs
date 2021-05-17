const bookRoutes = require('./bookRoutes');
module.exports = (router) => {
    router.use('/api', bookRoutes())

    return router;
}