
const modelUser = require('./model.users');

async function saveUser(body){

    const newUser  = new modelUser({
        username: body.username,
        email: body.email,
        password: body.password
    });

    // salva no banco o novo usuario
   return await newUser.save()
}

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