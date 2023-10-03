'use strict';

// pega o modelo da tabela no banco de dados

const User = require('../models/users');
const Token = require('../models/session');

exports.get = (req,res) => {
    const token = req.params.token;

    res.status(200).send({
        token: token,
        expirity: new Date().toLocaleTimeString()
    });
}

exports.post = (req,res) => {
    
    // pegando os dados para inserir usuario no banco
    const data = req.body;

    // validação dos dados 

    // inserindo os dados no banco
    const user  = new User({
        username:  data.username,
        email: data.email,
        password: data.password
        
    });
    
    user.save()
    
    // resposta da rota
    .then(() => {

        res.status(201).send({
            message: 'Usuario cadastrado com sucesso!'
        });
    })

    .catch(e => {
        res.status(400).send(e)
    }) 
}

