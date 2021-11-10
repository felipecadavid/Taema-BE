const categories = require('../api/categories');
const products = require('../api/products');
const users = require('../api/users');

module.exports = app => {
    app.use('/api/categories', categories);
    app.use('/api/products', products);
    app.use('/api/users', users);
}