require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = process.env.SECRET_KEY

// gera um jwt usando o id e email
function gerarToken(id,email) {
    return jwt.sign({ email: email, userId: id, startDate: new Date().toLocaleString() }, secretKey, { algorithm: 'HS256', expiresIn: '2h' })
}

// descriptografa o jwt para ter acesso às informações
function descriptografar(token) {
    return jwt.verify(token,secretKey,(error,decoded) => {
        // retorna o json descriptogarfado ou o erro
        if (!decoded) throw new Error(error.message)

        return decoded
    })    
}

function hashSenha(senha) {
    return bcrypt.hashSync(senha, 10)  // Gera uma cadeia de caracteres aleatorios baseado no tamanho do salt, 10 no caso 
}

function validarSenhaCriptografada(senhaDigitada, senhaArmazenada) {
    return bcrypt.compareSync(senhaDigitada,senhaArmazenada);
}


module.exports = {
    gerarToken,
    descriptografar,
    hashSenha,
    validarSenhaCriptografada
}