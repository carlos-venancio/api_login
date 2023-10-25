
const Session = require('../models/model.session')
const Token = require('../controllers/criptografar');

// cria um novo token
async function registerToken (id,email) {

    // gera o token 
    const tokenGerado = Token.gerarToken(id,email);
    console.log(tokenGerado)
    
    // criar uma sessão com o token
    const createSession = new Session({
        token: tokenGerado,
        userId: id
    });
    
    // cadastra no banco de dados
    await createSession.save();

    return tokenGerado;
}

module.exports = {
    registerToken,
}