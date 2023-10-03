'use strict'

const mongoose = require('mongoose')

// classe que nos permite criar um modelo de tabela chamado de esquema
const Schema = mongoose.Schema;

const sesion = new Schema({
    // o usuario vai ser referenciado no jwt
    token: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    expirity: {
        type: String,
        required: true,
        unique: true
    },
    init: {
        type: String,
        required: true
    }
});

// pega ou cria a tabela 'sessions' de acordo com o esquema da variavel 'session' 
module.exports = mongoose.model('Session',sesion);