
const modelUser = require('../models/model.users');

// cadastra o usuario no banco
async function saveUser(body){

    const newUser  = new modelUser({
        username: body.username,
        email: body.email,
        password: body.password
    });

    // salva no banco o novo usuario
   return await newUser.save()
}

// consulta o usuario no banco
async function queryUsuario(query){

    // consulta o usuário no banco
    const userSelected = await modelUser.findOne({
        email: query.email,
        password: query.password
    })
    
    return userSelected
}

module.exports = {
    saveUser,
    queryUsuario
} 