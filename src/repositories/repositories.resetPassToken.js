const resetPass = require('../models/model.resetPass');
const Token = require('../controllers/criptografar');

async function registerToken(id,email){
 
    // cria um token para inserir
    const token = Token.gerarToken(id,email);

    const newToken = new resetPass({
        userId: id,
        token
    })
    
    // salva novo token no banco
    await newToken.save();

    return token;
}

// consulta se o token é valido
async function getToken(token){

    const tokenResetPass = await resetPass.findOne({
        token: token,
        active: true
    });

    return tokenResetPass;
}

async function disablingActive(token){

    await resetPass.findOneAndUpdate({
        token: token,
    },
    {
        active: false
    });
}

module.exports = {
    registerToken,
    getToken,
    disablingActive
}