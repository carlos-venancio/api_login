const { registerToken } = require('../repositories/repositories.session') 
const { getUserById } = require('../repositories/repositories.users') 
const { descriptografar } = require('./criptografar');

// cria um novo token apartir do existente
exports.refresh = async (req,res,next) => {
    
    try {
        // descriptografa o token para ter acesso aos dados
        const data = descriptografar(req.body.token);

        // consulta o usuario para pegar o nome
        const user = await getUserById(data.userId);

        // inserindo denovo no banco
        const token = await registerToken(data.userId,data.email);

        // adiciona o usuario no retorno
        token.username = user.username;

        res.status(token.status).send(token);
    }

    catch(e) {
        res.status(400).send({
            status: 400,
            message: "Falha ao cadastrar",
            error: e.message
        })
    }
}