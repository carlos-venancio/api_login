const app = require('../src/app')
const connect_bank = require('../src/connect_bank')

// conecta o banco de dados à api
connect_bank();
 
// pega a porta 3000 caso não tenha nenhuma atribuida no deploy
const port = normalizePort(process.env.PORT || '3000' )

// configura a porta onde estará a aplicação
app.listen(port,() => {
    console.log('Servidor está rodando na porta ' + port)
})

// ---- TRATAMENTOS -----

// configura uma resposta para caso dê um erro no servidor
app.on('error',(error) => {

    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' 
            ? 'Pipe' + port 
            : 'Port' + port

    switch(error.code) {
        case 'EACCES': 
            console.error(bind + "requires elevated privigiles");
            process.exit(1);
            break;
            
        case 'EADDRINUSE': 
            console.error(bind + "is already in use");
            process.exit(1);
            break;
        
        default: 
            throw error;

    }
})

// tratamento da porta 
function normalizePort(val) {
    const port = parseInt(val,10)

    // caso a porta não for um número, retorna o valor
    if(isNaN(port)) {
        return val;
    }

    // retorna o número da porta
    if(port >= 0) {
        return port;
    }

    return false;
}