const { registerToken } = require('../repositories/repositories.session') 
const { getUserById } = require('../repositories/repositories.users') 
const { descriptografar } = require('./criptografar');
const { sucessResponse, errorResponse } = require('../utils/constructorResponse')

// cria um novo token apartir do existente
exports.refresh = async (req,res) => {

    try {
        // descriptografa o token para ter acesso aos dados
        const data = descriptografar(req.body.token);

        // inserindo denovo no banco
        const token = await registerToken(data.userId,data.email);
        
        // consulta o usuario para pegar o nome
        const user = await getUserById(data.userId);

        res.status(200).send(
            sucessResponse(200,token,user.username,"Token recarregado")
        );
    }

    catch(e) {
        res.status(500).send(
            errorResponse(500,"recarregar token",e)
        )
    }
}