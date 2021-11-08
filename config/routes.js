const categories = require('../api/categories');
const products = require('../api/products');
const orders = require('../api/orders');

module.exports = app => {
    app.use('/api/categories', categories);
    app.use('/api/products', products);
    app.use('/api/orders', orders);
}