'use stict'

const mongoose = require('mongoose');

// modelo do usuario que faz login com midia social, como "Google"
const UserSocial = new mongoose.Schema({

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

    // "id" que vem da api da google
    sub: {
        type: String,
        required: true
    }
});

// pega ou cria a tabela 'users' de acordo com o esquema da variavel 'user' 
module.exports = mongoose.model('userSocial',UserSocial);