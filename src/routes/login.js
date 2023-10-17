const express = require('express');
const controller = require('../controllers/login.controller');

const routes = express.Router();

routes.get('/login',controller.get)
routes.post('/', controller.post)

module.exports = routes;