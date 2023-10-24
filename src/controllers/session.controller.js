const { registerToken } = require('../repositories/repositories.session') 
const { getUserById } = require('../repositories/repositories.users') 
const { descriptografar } = require('./criptografar');
const { sucessResponse, errorResponse } = require('../utils/constructorResponse')

// cria um novo token apartir do existente
exports.refresh = async (req,res) => {

    try {
        console.log(req.body.token)
        // descriptografa o token para ter acesso aos dados
        const data = descriptografar(req.body.token);
        console.log(data)
        
        // inserindo denovo no banco
        const token = await registerToken(data.userId,data.email);
        console.log(token)
        
        // consulta o usuario para pegar o nome
        const user = await getUserById(data.userId);
        console.log(user)

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