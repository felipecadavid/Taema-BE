const { Router } = require('express');

const controller = require('./order.controller');
const auth = require('../../auth/auth.service');

const app = new Router();

//Endpoints 
app.get('/', auth.verifyAdmin, controller.getOrders);
app.get('/:id', auth.verifyAdmin, controller.getOrderDetailed);
app.post('/', controller.createOrder);
app.put('/:id', auth.verifyAdmin, controller.updateStatus);

module.exports = app;