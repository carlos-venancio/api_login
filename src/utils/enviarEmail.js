'use strict'
require('dotenv').config()

const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.SENHA_FROM
    }
})

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

module.exports = {
    enviarEmailRedefinirSenha
}