'use strict';

const { validarEmailAndSenhaAndNome, validarTentativaDeInjecao } = require('./validacao')
const insertUser  = require('../repositories/repositories.users')
const insertSession = require('../repositories/repositories.session')
const { sucess, error } = require('../utils/constructorResponse')

// realiza o login consultando o usuario e retonando o token
exports.get = async (req,res) => {
    
    // permite a formatação da resposta
    let statusCode = 201;

    try {

        // evita que uma injeção seja aplicada
        validarTentativaDeInjecao(req.query)
        
        // consulta o usuário
        const userSelected = await insertUser.queryUsuario(req.query)
        
        // lança um erro caso o usuário não for encontrado
        if (userSelected === null) return res.status(404).send(
            error(404,'encontra usuario',new Error('Usuário não encontrado'))
        )

        // registra a sessão
        const token = await insertSession.registerToken(userSelected._id,userSelected.email);

        res.status(statusCode).send(
            sucess(statusCode,token,userSelected.username,'Logado')
        );       
    }

    catch(e) {
        statusCode = 500;   
        res.status(statusCode).send(error(statusCode,'consultar',e))
    }
}

// realiza o cadastro do usuario e retorna o token da sessão
exports.post =  async (req,res) => {

    let statusCode = 201;

    try {
        // validação dos dados 
        validarEmailAndSenhaAndNome(req.body)

        // cadastra o usuario
        const usuarioCadastrado = await insertUser.saveUser(req.body);
    
        // cadastra uma sessão para ele
        const token = await insertSession.registerToken(usuarioCadastrado._id,usuarioCadastrado.email);
        
        res.status(statusCode).send(
            sucess(statusCode,token,usuarioCadastrado.username)
        );  
    }

    catch(e) {

        statusCode = 500

        // formata mensagem para caso o usuário já existir
        if (e.message.includes('E11000')) e.message = "Email já está em uso";
        
        res.status(statusCode).send(error(statusCode,'consultar',e))
        
    }
}