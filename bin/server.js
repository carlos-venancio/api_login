'use strict'

// cria o servidor com as configurações da aplicação
const http = require('http');

const app = require('../src/app')
const port = 3000;

app.set('port',port)

const server = http.createServer(app);

server.listen(port)
console.log('Servidor rodando')

// FAZER

// normalização de porta 
// tratamento de erros
// escuta