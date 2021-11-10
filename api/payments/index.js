const { Router } = require('express');

const controller = require('./payments.controller');

const app = new Router();

//Endpoints
app.post('/create-card', controller.createCard);
app.post('/create-customer', controller.createCustomer);
app.post('/charge', controller.charge);

module.exports = app;