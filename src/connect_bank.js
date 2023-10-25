// CONEXÃO COM O BANCO

require('dotenv').config()

const mongoose = require('mongoose');

async function connect() {

    // conecta no cluster e pega a coleção api_login
    mongoose.connect(process.env.URL_CLUSTER,{
        dbName: process.env.DATABASE
    })
    
    // confirmação de conexão com o banco 
    .then(() => console.log('Conectado ao banco'))
    
    // exibição de possivel erro
    .catch(err => console.log(err))
}

module.exports = connect;