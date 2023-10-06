'use strict';

// pega o modelo da tabela no banco de dados

const Token = require('../controllers/criptografar');
const User = require('../models/users');
const Session = require('../models/session');
const {validarEmail, validarSenha, validarNome} = require('../controllers/condicoesCampos')


exports.get = (req,res) => {
    if (!validarEmail(req.body.email) || !validarSenha(req.body.password)) {
        return res.status(400).send({
            status: 400,
            message: 'Dados Inválidos'
        });
    }

    // pesquisar se existe o token e a sessão está ativa
    User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    .then(user => {
        // caso não encontre nada 
        if (user === undefined) {
            res.status(400).send({
                status: 400,
                message: 'Usuário não cadastrado'
            })
        }

        // caso encontre retornará o token e outros dados
        else { 
            // criar o token
            const token = cadastrarToken(user._id,user.email);

            if (token.status === 201) {
                res.status(201).send(token)
            }
    
            else {
                res.status(400).send(token)
            }
    
        }
    })

    .catch(e => {
        res.status(400).send(e)
    }) 
}

exports.post =  (req,res) => {

    if (!validarNome(req.body.username) || !validarEmail(req.body.email) || !validarSenha(req.body.password)) {
        return res.status(400).send({
            status: 400,
            message: 'Dados inválidos'
        });
    }

    // inserindo os dados no banco
    const user  = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    
    // salva no banco o novo usuario
    user.save()

    .then(() => {
        
        // cadastra o token caso consiga cadastrar o usuario
        const token = cadastrarToken(user._id,user.email);

        if (token.status === 201) {
            res.status(201).send(token)
        }

        else {
            res.status(400).send(token)
        }

    })
    
    .catch(e => {
        res.status(400).send(e)
    }) 
}


function cadastrarToken (id,email) {
    // gera o token 
    const token = Token.gerarToken(id,email)

    // cadastra no banco de dados
    const createSession = new Session({
        token: token,
        userId: id
    })

    createSession.save()

    .then(() => {
        return {
            status: 201,
            messsage: 'Cadastrado com sucesso!',
            token: token,
            expirity: new Date().setHours(new Date().getHours() + 2)
        }
    })

    .catch(e => {
        return {
            status: 400,
            erro: 'Falha ao cadastrar o token'
        }
    })
}