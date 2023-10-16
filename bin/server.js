const app = require('../src/app')
const connect_bank = require('../src/connect_bank')

connect_bank()
 
// pega a porta 3000 caso não tenha nenhuma atribuida no deploy
const port = 3000 || process.env.PORT

app.listen(port,() => {
    console.log('Servidor está rodando na porta' + port)
})