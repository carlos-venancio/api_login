'use strict'

const mongoose = require('mongoose')

// classe que nos permite criar um modelo de tabela chamado de esquema
const Schema = mongoose.Schema;

const user = new Schema({
    name: {
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
    senha: {
        type: String,
        required: true,
        trim: true
    }
});

// pega ou cria a tabela 'users' de acordo com o esquema da variavel 'user' 
module.exports = mongoose.model('users',user);