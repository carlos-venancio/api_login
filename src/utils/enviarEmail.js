'use strict'
require('dotenv').config()

const nodemailer = require('nodemailer')

var transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      clientId: process.env.OAUTH_CLIENTEID,
      clientSecret: process.env.OAUTH_CLIENTE_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    }
});

async function enviarEmailRedefinirSenha(emailDestinatario, codigo){

    try{

        const email = await transport.sendMail({
            from: process.env.EMAIL_FROM,
            to: emailDestinatario,
            subject: 'Redefina sua senha',
            text: `Codigo para recuperação da senha: ${codigo}` 
        })
    
        // caso o email não for enviado
        if (!email.accepted.length) {
            throw new Error('Falha ao enviar o email')
       }
    }

    catch(e) {
        console.log(e)
    }

}


// transport.sendMail({
//     from: process.env.EMAIL_FROM,
//     to: "ipp.carloshenrique@gmail.com",
//     subject: 'Redefina sua senha',
//     text: `Codigo para recuperação da senha: 123456` 
// })

// .then((data) => console.log(data))
// .catch(error => console.log(error))

module.exports = {
    enviarEmailRedefinirSenha
}