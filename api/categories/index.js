const { Router } = require('express');

const controller = require('./categories.controller');

const app = new Router();

const mail = require('../../mails/mail.service');

//Endpoints
app.get('/', controller.getCategories);
app.post('/', controller.createCategory);
app.put('/', controller.editCategory);
app.delete('/', controller.deleteCategory);

app.get('/test', mail.sendTestEmail);

module.exports = app;