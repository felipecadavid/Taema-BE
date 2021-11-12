const { Router } = require('express');

const controller = require('./products.controller');

const auth = require('../../auth/auth.service');

const app = new Router();

//Endpoints
app.get('/', auth.verifyAdmin, controller.getProducts);
app.get('/categories/:category', controller.getProductsByCategory);
app.get('/getAList', controller.getAListOfProducts);
app.get('/getOne/:id', controller.getASpecificProduct);
app.post('/', controller.createProduct);
app.put('/', controller.editProduct);
app.delete('/', controller.deleteProduct);

module.exports = app;