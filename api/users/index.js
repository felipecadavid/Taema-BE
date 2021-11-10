const { Router } = require('express');

const controller = require('./users.controller');

const auth = require('../../auth/auth.service');

const app = new Router();

//Endpoints
// app.post('/create', controller.createUser);
app.get('/login', auth.logger, auth.getData);
app.get('/getUserData', auth.getData);

module.exports = app;