const express = require('express');

const testeRoute = express.Router();

/**
 * @swagger
 * /teste:
 *   get:
 *     tags:
 *       - Teste
 *     description: Retorna uma mensagem de teste
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Mensagem de sucesso
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: number
 *             message:
 *               type: string
 */
testeRoute.get('/', (req, res) => {
    res.status(200).send({
        status: 200,
        message: 'Está funcionando'
    })
});

module.exports = testeRoute;