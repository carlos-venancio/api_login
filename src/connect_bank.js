// CONEXÃO COM O BANCO

function connect() {
    const mongoose = require('mongoose');
    
    // conecta no cluster e pega a coleção api_login
    mongoose.connect('mongodb+srv://api115:api115@cluster0.1inmp9b.mongodb.net/?retryWrites=true&w=majority',{
        dbName: 'api-login'
    })
    
    // confirmação de conexão com o banco 
    .then(() => console.log('Conectado ao banco'))
    
    // exibição de possivel erro
    .catch(err => console.log(err))
}

module.exports = connect;