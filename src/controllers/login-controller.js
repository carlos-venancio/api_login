'use strict';

const mongoose = require('mongoose')
// pega o modelo da tabela no banco de dados
const User = mongoose.model('users')

exports.get = (req,res) => {
    const token = req.params.token;

    res.status(200).send({
        token: token,
        expirity: new Date().toLocaleTimeString()
    });
}

exports.post = (req,res) => {
    
    res.status(200).send({
        token: 'token',
        expirity: new Date().toLocaleTimeString()
    });
}