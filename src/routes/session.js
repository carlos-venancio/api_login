const express = require('express');
const controller = require('../controllers/session.controller')

const routes = express.Router();

// rota que recarrega um token
routes.post('/refresh',controller.refresh)

module.exports = routes;