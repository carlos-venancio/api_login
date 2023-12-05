const { hashSenha } = require('../controllers/criptografar')
const { generateArrayRandomUnit } = require('../utils/generateRandom')

require('dotenv').config()

const modelUser = require('../models/model.users');

// cadastra o usuario no banco
async function saveUser(body){

    const newUser  = new modelUser({
        username: body.username,
        email: body.email,
        password: hashSenha(body.password), // senha criptografada com hash
        lenPassword: body.password.length
    });

    // gambiarra para testar a rota de cadastro, pois finge cadastrar
    // if(body.email === process.env.EMAIL_TESTE)  {
    //     return newUser;
    // }

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

// deleta um usuario pelo id
async function deleteUser(id) {

    // procura um usuário e deleta ele
    const userDeleted = await modelUser.findOneAndDelete({
        _id: id
    });

    return userDeleted;
}

// inseri um recoveryCode
async function insertRecoveryCode(id) {

    // quantidade de caracteres gerados
    const amountCode = 6;

    // gera o codigo de recuperação
    const newRecoveryCode = generateArrayRandomUnit(amountCode);
    
    // atualiza o codigo de recuperação
    await modelUser.findByIdAndUpdate(id,{recoveryCode: newRecoveryCode});
    
    return newRecoveryCode;
}

// limpa o codigo de recuperação
async function clearRecoveryCode(id) {
    
    // reseta o recoveryCode para null
    await modelUser.findByIdAndUpdate(id,{
        recoveryCode:'null'
    },
    {
        new: true
    });

    return 
}

// atualiza a senha
async function updatePassword(id,newPassword) {

    // inseri a nova senha
    await modelUser.findByIdAndUpdate(id, {
        password: hashSenha(newPassword) 
    }, { new: true })

    return
}

module.exports = {
    saveUser,
    queryUsuario,
    getUserById,
    deleteUser,
    insertRecoveryCode,
    clearRecoveryCode,
    updatePassword
} 