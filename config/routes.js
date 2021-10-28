const categories = require('../api/categories');
const products = require('../api/products');

module.exports = app => {
    app.use('/api/categories', categories);
    app.use('/api/products', products);
}