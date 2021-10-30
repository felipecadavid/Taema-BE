const { Router } = require('express');

const controller = require('./products.controller');

const app = new Router();

//Endpoints
app.get('/', controller.getProducts);
app.get('/categories/:category', controller.getProductsByCategory);
app.get('/:id', controller.getASpecificProduct);
app.post('/', controller.createProduct);
app.put('/', controller.editProduct);
app.delete('/', controller.deleteProduct);

module.exports = app;