const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// conecta ao banco de dados
mongoose.connect('mongodb+srv://api115:api115@cluster0.1inmp9b.mongodb.net/?retryWrites=true&w=majority',{
    dbName: 'api_login'
})

// converte por padrão o corpo da requisição
app.use(bodyParser.json())

// importação das rotas
const teste = require('./routes/teste');
const login = require('./routes/login');

// configuração dos endpoints das rotas
app.use('/',teste)
app.use('/',login)

module.exports = app;