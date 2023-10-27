
require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY

// gera um jwt usando o id e email
function gerarToken(id,email) {
    return jwt.sign({ email: email, userId: id, startDate: new Date().toLocaleString() }, secretKey, { algorithm: 'HS256', expiresIn: '2h' })
}

// descriptografa o jwt para ter acesso às informações
function descriptografar(token) {
    const data = jwt.verify(token,secretKey,(error,decoded) => {
        // retorna o json descriptogarfado ou o erro
        if (!decoded) throw new Error(error.message)

        return decoded
    })

    return data
}

module.exports = {
    gerarToken,
    descriptografar
}