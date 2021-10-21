const categories = require('../api/categories');
const tasks = require('../api/tasks');

module.exports = app => {
    app.use('/api/categories', categories);
}