// CONEXÃO COM O BANCO

const express = require('express');

const mongoose = require('mongoose');

// conecta no cluster e pega a coleção api_login
mongoose.connect('mongodb+srv://api115:api115@cluster0.1inmp9b.mongodb.net/?retryWrites=true&w=majority',{
    dbName: 'api-login'
})

// teste de conexão com o banco 
.then(() => console.log('Conectado ao banco'))
.catch(err => console.log(err))

// CONFIGURAÇÃO DA API
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

// converte por padrão o corpo da requisição
app.use(bodyParser.json())
app.use(cors())

// importação das rotas
const teste = require('./routes/teste');
const login = require('./routes/login');

// configuração dos endpoints das rotas
app.use('/',teste)
app.use('/',login)

module.exports = app;