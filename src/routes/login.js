const express = require('express');
const controller = require('../controllers/login.controller');

const routes = express.Router();

routes.get('/login',controller.get)
routes.post('/', controller.post)
// routes.put('/',controller.put)
// routes.delete('/',controller.delete)

module.exports = routes;