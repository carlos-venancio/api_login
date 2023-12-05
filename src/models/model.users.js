'use strict'

const mongoose = require('mongoose')

// classe que nos permite criar um modelo de tabela chamado de esquema
const User = new mongoose.Schema({
    // atributos do modelo do usuário
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    lenPassword: {
        type: Number
    },
    recoveryCode: {
        type: String,
        unique: true,
        default: 'null'
    }
});

// pega ou cria a tabela 'users' de acordo com o esquema da variavel 'user' 
module.exports = mongoose.model('user',User);