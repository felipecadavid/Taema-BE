const { Router } = require('express');
const cors = require('cors');
const controller = require('./order.controller');
const auth = require('../../auth/auth.service');

const app = new Router();

app.use(cors());

const mail = require('../../mails/mail.service');

//Endpoints 
app.get('/', auth.verifyAdmin, controller.getOrders);
app.get('/:id', auth.verifyAdmin, controller.getOrderDetailed);
app.post('/', controller.createOrder, mail.confirmationOrderEmail);
app.put('/:id', auth.verifyAdmin, controller.updateStatus);

module.exports = app;