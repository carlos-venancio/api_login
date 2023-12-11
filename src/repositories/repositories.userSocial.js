const userSocial = require('../models/model.userSocial');
const { hashSenha } = require('../controllers/criptografar')

// salva o usuario no banco de dados
async function saveUserSocial(username, email, sub){

    const newUserSocial = new userSocial({
        username,
        email,
        sub: hashSenha(sub)
    });

    return await newUserSocial.save();
}

// consulta um usuario pelo email
async function queryUserSocial(email) {

    return await userSocial.find({
        email
    })
}

module.exports = {
    saveUserSocial,
    queryUserSocial
}