'use strict';

const { validarEmailAndSenha, validarEmailAndSenhaAndNome } = require('./validacao')
const insertUser  = require('../repositories/repositories.users')
const insertSession = require('../repositories/repositories.session')

// realiza o login consultando o usuario e retonando o token
exports.get = async (req,res) => {
    
    try {

        // validação dos dados
        validarEmailAndSenha(req.query)

        // consulta o usuário
        const userSelected = await insertUser.queryUsuario(req.query)
        
        // lança um erro caso o usuário não for encontrado
        if (userSelected == null) res.status(404).send({status: 404,message: 'Usuário não encontrado'})

        // registra a sessão
        const token = await insertSession.registerToken(userSelected._id,userSelected.email, "Logado com sucesso!");

        token.username = userSelected.username; 

        res.status(token.status).send(token);       
    }

    catch(e) {
        console.log(e)
        res.status(400).send({
            status: 400,
            message: "Falha ao consultar",
            error: e.message
        })
    }
}

// realiza o cadastro do usuario e retorna o token da sessão
exports.post =  async (req,res) => {

    try {
        // validação dos dados 
        validarEmailAndSenhaAndNome(req.body)

        // cadastra o usuario
        const usuarioCadastrado = await insertUser.saveUser(req.body);
    
        // cadastra uma sessão para ele
        const token = await insertSession.registerToken(usuarioCadastrado._id,usuarioCadastrado.email,"Cadastrado como sucesso!");
        res.status(token.status).send(token);
    }

    catch(e) {
        console.log(e)
        
        // formata mensagem para caso o usuário já existir
        if (e.message.includes('E11000')) e.message = "Email já está em uso";

        res.status(400).send({
            status: 400,
            message: "Falha ao cadastrar",
            error: e.message
        })
    }
}