const express = require('express');
const controller = require('../controllers/login.controller');

const routes = express.Router();

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
 *     description: Cadastra um usuario
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Sucesso ao obter informações da página de login
 *       400:
 *         description: Erro ao obter informações
 */

routes.post('/login',controller.get)

routes.post('/login/social', controller.loginSocial)

routes.delete('/login', controller.delete)

routes.patch('/recuperarSenha', controller.recuperarSenha)

routes.post('/recuperarSenha/validar', controller.validarRecoveryCode)

routes.patch('/recuperarSenha/novaSenha', controller.cadastrarNovaSenha)

/**
 * @swagger
 * /trocarSenha:
 *   post:
 *     tags:
 *       - Login
 *     description: Troca a senha de um usuario utilizando a antiga senha.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         description: Informações do usuário para o login
 *         schema:
 *           type: object
 *           required:
 *             - token
 *             - password
 *             - newPassword
 *           properties:
 *             token:
 *               type: string
 *             password:
 *               type: string
 *             newPassword:
 *               type: string

 *     responses:
 *       200:
 *         description: Sucesso ao realizar o login
 *       401:
 *         description: Credenciais inválidas
 *       400:
 *         description: Requisição mal formatada
 */

routes.patch('/trocarSenha', controller.trocarSenha)

module.exports = routes;