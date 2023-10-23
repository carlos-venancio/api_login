const { registerToken } = require('../repositories/repositories.session') 
const { getUserById } = require('../repositories/repositories.users') 
const { descriptografar } = require('./criptografar');
const { sucess, error } = require('../utils/constructorResponse')

// cria um novo token apartir do existente
exports.refresh = async (req,res) => {
    
    let statusCode = 200

    try {
        // descriptografa o token para ter acesso aos dados
        const data = descriptografar(req.body.token);

        // inserindo denovo no banco
        const token = await registerToken(data.userId,data.email);
        
        // consulta o usuario para pegar o nome
        const user = await getUserById(data.userId);

        res.status(statusCode).send(
            sucess(statusCode,token,user.username,"Token recarregado")
        );
    }

    catch(e) {
        
        statusCode = String(e.stack).includes('criptografar') ? 400 : 500;
        res.status(statusCode).send(
            error(statusCode,"recarregar token",e)
        )
    }
}