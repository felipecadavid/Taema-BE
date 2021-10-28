const categories = require('../api/categories');

module.exports = app => {
    app.use('/api/categories', categories);
}