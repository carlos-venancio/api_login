'use strict'

const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '587',
    secure: false,
    auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.SENHA_FROM
    }
})

async function enviarEmailRedefinirSenha(emailDestinatario,codigo){
   
    await transport.sendMail({
        from: process.env.EMAIL_FROM,
        to: emailDestinatario,
        subject: 'Redefina sua senha',
        text: `Codigo para recuperação da senha: ${codigo}` 
    })
}

module.exports = {
    enviarEmailRedefinirSenha
}