const express = require('express');
const controller = require('../controllers/session.controller')

const routes = express.Router();

/**
 * @swagger
 * /refresh:
 *   post:
 *     tags:
 *       - Session
 *     description: Recarrega um token
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Informações necessárias para recarregar o token
 *         schema:
 *           type: object
 *           required:
 *             - token
 *           properties:
 *             token:
 *               type: string
 *     responses:
 *       200:
 *         description: Token recarregado com sucesso
 *       400:
 *         description: Erro ao recarregar o token
 */
routes.post('/refresh',controller.refresh);

module.exports = routes;