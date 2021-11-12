const categories = require('../api/categories');
const products = require('../api/products');

const users = require('../api/users');
const orders = require('../api/orders');
const payments = require('../api/payments')

module.exports = app => {
    app.use('/api/categories', categories);
    app.use('/api/products', products);
    app.use('/api/users', users);
    app.use('/api/orders', orders);
    app.use('/api/payments', payments);
}