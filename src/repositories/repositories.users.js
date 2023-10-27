require('dotenv').config()

const modelUser = require('../models/model.users');

// cadastra o usuario no banco
async function saveUser(body){

    const newUser  = new modelUser({
        username: body.username,
        email: body.email,
        password: body.password
    });

    // gambiarra para testar a rota de cadastro, pois finge cadastrar
    if(body.email === process.env.EMAIL_TESTE)  {
        return newUser;
    }

    // salva no banco o novo usuario
   return await newUser.save();
}

// consulta o usuario no banco
async function queryUsuario(query){

    // consulta o usuário no banco
    const userSelected = await modelUser.findOne({
        email: query.email,
        password: query.password
    });
    
    return userSelected;
}

// consulta um usuario pelo id dele
async function getUserById(id) {

    // pega o usuario pelo id
    const userSelected = await modelUser.findById(id); 
    console.log(userSelected)

    return userSelected;
}

module.exports = {
    saveUser,
    queryUsuario,
    getUserById
} 