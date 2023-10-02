const express = require('express');
const controller = require('../controllers/login-controller');

const routes = express.Router();

routes.get('/:token',controller.get)
routes.post('/', controller.post)

module.exports = routes;