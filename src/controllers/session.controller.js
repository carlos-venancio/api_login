const { registerToken } = require('../repositories/repositories.session') 
const { descriptografar } = require('./criptografar');

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