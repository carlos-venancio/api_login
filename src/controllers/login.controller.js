'use strict';

const insertUser  = require('../models/users/insert.users')
const insertSession = require('../models/session/insert.session')

exports.get = async (req,res) => {
    
    
    try {
        // validar dados 
        
        const userSelected = await insertUser.queryUsuario(req.query)
        
        // valida o usuario
        if (userSelected == null) throw new Error('Usuário não encontrado')

        const token = await insertSession.registerToken(userSelected._id,userSelected.email,"Logado com sucesso!");
        res.status(token.status).send(token);       
    }

    catch(e) {
        res.status(400).send({
            status: 400,
            message: e.message
        })
    }
}

exports.post =  async (req,res) => {

    
    try {
        // validar dos dados 
        
        // cadastra o usuario
        const usuarioCadastrado = await insertUser.saveUser(req.body);
    
        // cadastra uma sessão para ele
        const token = await insertSession.registerToken(usuarioCadastrado._id,usuarioCadastrado.email,"Cadastrado como sucesso!");
        res.status(token.status).send(token);
    }

    catch(e) {
        res.status(500).send({
            status: 500,
            message: "Falha ao cadastrar",
            error: e
        })
    }
}
