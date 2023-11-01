'use strict';

const { validarEmailAndSenhaAndNome, validarTentativaDeInjecao } = require('./validacao')
const insertUser  = require('../repositories/repositories.users')
const insertSession = require('../repositories/repositories.session')
const { sucessResponse, errorResponse } = require('../utils/constructorResponse');
const { validarSenha } = require('../controllers/criptografar')

/**
 * @swagger
 * /login:
 *   get:
 *     tags:
 *       - Authentication
 *     description: Realiza o login do usuário e retorna o token.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: query
 *         required: true
 *         type: string
 *       - name: senha
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Logado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       400:
 *         description: Falha ao consultar
 */

// realiza o login consultando o usuario e retonando o token
exports.get = async (req,res) => {

    try {
        
        // pega o email e a senha independente de onde venha
        const dados = Object.entries(req.query) == 0 ? req.body : req.query
        
        validarTentativaDeInjecao(dados)
        
        // consulta o usuário
        const userSelected = await insertUser.queryUsuario(dados)

        // lança um erro caso o email e a senha não forém válidos
        if (!(userSelected && validarSenha(dados.password,userSelected.password))) return res.status(404).send(
            errorResponse(404,'encontra usuario',new Error('Usuário não encontrado'))
        )

        // registra a sessão
        const token = await insertSession.registerToken(userSelected._id,userSelected.email);
        
        res.status(200).send(
            sucessResponse(200,token,userSelected.username,'Logado')
        );       
    }

    catch(e) {
        res.status(500).send(
            errorResponse(500,'consultar',e)
        )
    }
}

// realiza o cadastro do usuario e retorna o token da sessão
exports.post =  async (req,res) => {

    try {
        // validação dos dados 
        const errorData = validarEmailAndSenhaAndNome(req.body);
        if (errorData) res.status(400).send(
            errorResponse(400,'validar os dados',{message:errorData})
        )

        // cadastra o usuario
        const usuarioCadastrado = await insertUser.saveUser(req.body);
 
        // cadastra uma sessão para ele
        const token = await insertSession.registerToken(usuarioCadastrado._id,usuarioCadastrado.email);
        
        res.status(201).send(
            sucessResponse(201,token,usuarioCadastrado.username)
        );  
    }

    catch(e) {
        // formata mensagem para caso o usuário já existir
       if (e.message.includes('E11000') & e.message.toLowerCase().includes('email')) e.message = "Email já está em uso";
        
        res.status(500).send(
            errorResponse(500,'consultar',e)
        ) 
    }
}
