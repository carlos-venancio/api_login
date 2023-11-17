const { registerToken } = require('../repositories/repositories.session') 
const { getUserById } = require('../repositories/repositories.users') 
const { descriptografar } = require('./criptografar');
const { sucessResponse, errorResponse } = require('../utils/constructorResponse')

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
exports.refresh = async (req,res) => {

    try {
        // descriptografa o token para ter acesso aos dados
        if (!req.body.token) return res.status(400).send(
                errorResponse(400,'validar o token',new Error('Insira um token para recarregar'))
            )

        const data = descriptografar(req.body.token);
        
        // inserindo denovo no banco
        const token = await registerToken(data.userId,data.email);
        
        
        // consultando o usuario para pegar o nome
        const user = await getUserById(data.userId);

        res.status(201).send(
            sucessResponse(201,token,user.username,"Token recarregado")
        );
    }

    catch(e) {
        res.status(500).send(
            errorResponse(500,"recarregar token",e)
        )
    }
}