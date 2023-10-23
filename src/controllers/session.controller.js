const { registerToken } = require('../repositories/repositories.session') 
const { descriptografar } = require('./criptografar');

/**
 * @swagger
 * /refresh-token:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Cria um novo token a partir do existente.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: body
 *         description: Token existente para ser renovado.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *     responses:
 *       200:
 *         description: Token renovado com sucesso
 *       400:
 *         description: Falha ao renovar o token
 */

// cria um novo token apartir do existente
exports.refresh = async (req,res,next) => {
    
    try {
        // descriptografa o token para ter acesso aos dados
        const data = descriptografar(req.body.token)

        // inserindo denovo no banco
        const token = await registerToken(data.userId,data.email)

        res.status(token.status).send(token)
    }

    catch(e) {
        res.status(400).send({
            status: 400,
            message: "Falha ao cadastrar",
            error: e.message
        })
    }
}