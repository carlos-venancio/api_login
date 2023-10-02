const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json())


// importação das rotas
const teste = require('./routes/teste');
const login = require('./routes/login');


// configuração dos endpoints das rotas
app.use('/',login)
app.use('/teste',teste)

module.exports = app;