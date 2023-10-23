'use strict';

const { validarEmailAndSenha, validarEmailAndSenhaAndNome } = require('./validacao')
const insertUser  = require('../repositories/repositories.users')
const insertSession = require('../repositories/repositories.session')

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

        // validação dos dados
        validarEmailAndSenha(req.query)

        // consulta o usuário
        const userSelected = await insertUser.queryUsuario(req.query)
        
        // lança um erro caso o usuário não for encontrado
        if (userSelected == null) res.status(404).send({status: 404,message: 'Usuário não encontrado'})

        // registra a sessão
        const token = await insertSession.registerToken(userSelected._id,userSelected.email,"Logado com sucesso!");
        res.status(token.status).send(token);       
    }

    catch(e) {
        console.log(e)
        res.status(400).send({
            status: 400,
            message: "Falha ao consultar",
            error: e.message
        })
    }
}

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Realiza o cadastro do usuário e retorna o token da sessão.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             senha:
 *               type: string
 *             nome:
 *               type: string
 *     responses:
 *       200:
 *         description: Cadastrado com sucesso
 *       400:
 *         description: Falha ao cadastrar
 */

// realiza o cadastro do usuario e retorna o token da sessão
exports.post =  async (req,res) => {

    try {
        // validação dos dados 
        validarEmailAndSenhaAndNome(req.body)

        // cadastra o usuario
        const usuarioCadastrado = await insertUser.saveUser(req.body);
    
        // cadastra uma sessão para ele
        const token = await insertSession.registerToken(usuarioCadastrado._id,usuarioCadastrado.email,"Cadastrado como sucesso!");
        res.status(token.status).send(token);
    }

    catch(e) {
        console.log(e)
        
        // formata mensagem para caso o usuário já existir
        if (e.message.includes('E11000')) e.message = "Email já está em uso";

        res.status(400).send({
            status: 400,
            message: "Falha ao cadastrar",
            error: e.message
        })
    }
}

