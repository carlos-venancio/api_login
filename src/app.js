'use strict'

// configuração das rotas e parametros
const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const logger = require('pino-http')

const app = express();

// configurações das requisições feitas a API
app.use(bodyParser.json()); // converte por padrão o corpo da requisição
app.use(cors());
// app.use(logger())


// importação das rotas
const teste = require('./routes/teste');
const login = require('./routes/login');
const session = require('./routes/session');

// configuração dos endpoints das rotas
app.use('/',teste);
app.use('/',login);
app.use('/session',session);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); //middleware do swagger ui


// exporta o modulo app para poder fazer as outras configurações
module.exports = app;