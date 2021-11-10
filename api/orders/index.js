const { Router } = require('express');

const controller = require('./order.controller');

const app = new Router();

//Endpoints
app.get('/', controller.getOrders);
app.post('/', controller.createOrder);
// app.put('/', controller.editOrder);
// app.delete('/', controller.deleteOrder);

module.exports = app;