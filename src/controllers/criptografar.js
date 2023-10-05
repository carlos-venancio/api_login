const jwt  = require('jsonwebtoken')

const secretKey = ''

function gerarToken(id,email) {
    return jwt.sign({ email: email, userId: id }, secretKey, { algorithm: 'HS256', expiresIn: '1h' })
}

module.exports = {
    gerarToken,

}