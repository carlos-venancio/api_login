const jwt = require('jsonwebtoken')

const secretKey = 'api_login'

function gerarToken(id,email) {
    return jwt.sign({ email: email, userId: id }, secretKey, { algorithm: 'HS256' })
}

module.exports = {
    gerarToken,

}