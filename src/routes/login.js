const express = require('express');
const controller = require('../controllers/login.controller');

const routes = express.Router();

/**
 * @swagger
 * /login:
 *   get:
 *     tags:
 *       - Login
 *     description: Obtém informações da página de login ou qualquer outra ação relacionada.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Sucesso ao obter informações da página de login
 *       400:
 *         description: Erro ao obter informações
 */

routes.get('/login', controller.get);

/**
 * @swagger
 * /:
 *   post:
 *     tags:
 *       - Login
 *     description: Realiza o login do usuário.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Informações do usuário para o login
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Sucesso ao realizar o login
 *       401:
 *         description: Credenciais inválidas
 *       400:
 *         description: Requisição mal formatada
 */

routes.post('/', controller.post);

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Login
 *     description: Obtém informações da página de login ou qualquer outra ação relacionada.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Sucesso ao obter informações da página de login
 *       400:
 *         description: Erro ao obter informações
 */

routes.post('/login',controller.get)


module.exports = routes;