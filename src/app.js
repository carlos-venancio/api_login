'use strict'

// configuração das rotas e parametros
const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

// converte por padrão o corpo da requisição
app.use(bodyParser.json())
app.use(cors())

// importação das rotas
const teste = require('./routes/teste');
const login = require('./routes/login');
const session = require('./routes/session')

// configuração dos endpoints das rotas
app.use('/v2',teste)
app.use('/v2',login)
app.use('/v2/session',session)

// exporta o modulo app para poder fazer as outras configurações
module.exports = app;