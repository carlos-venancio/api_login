
const Session = require('./model.session')
const Token = require('../../controllers/criptografar');

async function registerToken (id,email,msg="Cadastrado com sucesso") {

    // gera o token 
    const tokenGerado = Token.gerarToken(id,email)

    const createSession = new Session({
        token: tokenGerado,
        userId: id
    })
    
    // cadastra no banco de dados
    await createSession.save()

    return {
        status: 201,
        messsage: msg,
        token: tokenGerado,
        expirity: new Date().setHours(new Date().getHours() + 2)
    }
}


module.exports = {
    registerToken,
}