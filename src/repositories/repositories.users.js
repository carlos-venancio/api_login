const { hashSenha } = require('../controllers/criptografar')
require('dotenv').config()

const modelUser = require('../models/model.users');

// cadastra o usuario no banco
async function saveUser(body){

    const newUser  = new modelUser({
        username: body.username,
        email: body.email,
        password: hashSenha(body.password) // senha criptografada com hash
    });

    // gambiarra para testar a rota de cadastro, pois finge cadastrar
    if(body.email === process.env.EMAIL_TESTE)  {
        return newUser;
    }

    // salva no banco o novo usuario
   return await newUser.save();
}

// consulta o usuario no banco
async function queryUsuario(data){

    // consulta o usuário no banco
    const userSelected = await modelUser.findOne({
        email: data.email
    });
    
    return userSelected;
}

// consulta um usuario pelo id dele
async function getUserById(id) {

    // pega o usuario pelo id
    const userSelected = await modelUser.findById(id); 

    return userSelected;
}

async function deleteUser(id) {

    // procura um usuário e deleta ele
    const userDeleted = await modelUser.findOneAndDelete({
        _id: id
    });

    return userDeleted;
}

module.exports = {
    saveUser,
    queryUsuario,
    getUserById,
    deleteUser
} 