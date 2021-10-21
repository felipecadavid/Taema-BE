const { Router } = require('express');

const controller = require('./categories.controller');

const app = new Router();

//Endpoints
app.get('/', controller.getCategories);
app.post('/', controller.createCategory);
app.put('/', controller.editCategory);
app.delete('/', controller.deleteCategory);

module.exports = app;