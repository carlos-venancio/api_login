'use strict';

const { validarEmailAndSenhaAndNome, validarTentativaDeInjecao, validarExistenciaUsuario } = require('./validacao')
const insertUser  = require('../repositories/repositories.users')
const insertSession = require('../repositories/repositories.session')
const insertResetPass = require('../repositories/repositories.resetPassToken');
const { sucessResponse, errorResponse, simpleResponse } = require('../utils/constructorResponse');
const { validarSenha } = require('../controllers/criptografar')
const { descriptografar } = require('./criptografar')
const { enviarEmailRedefinirSenha } = require('../utils/enviarEmail')

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Realiza o login do usuário e' retorna o token.
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
        
        const errorData = validarTentativaDeInjecao(dados);

        if (validarTentativaDeInjecao(dados)) res.status(400).send(
            errorResponse(400,'validar os dados',{message:errorData})
        )
        
        // consulta o usuário
        const userSelected = await validarExistenciaUsuario(token);
        
        // testa a senha dependendo se esta criptografada ou não 
        const senhaValida = userSelected.password[0] !== "$" ? userSelected.password === dados.password : validarSenha(dados.password,userSelected.password)

        // é verdadeiro caso a senha for válida e falso caso for inválida 
        if (!senhaValida) return new Error('Usuário não encontrado')
                
        // registra a sessão
        const token = await insertSession.registerToken(userSelected._id,userSelected.email);
        
        res.status(200).send(
            sucessResponse(200,token,userSelected.username,'Logado')
        );       
    }

    catch(e) {
        res.status(500).send(
            errorResponse(500,'consultar usuário',e)
        )
    }
}

// realiza o cadastro do usuario e retorna o token da sessão
exports.post = async (req,res) => {

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
            errorResponse(500,'consultar usuário',e)
        ) 
    }
}

// rota que permite o login ou cadastrado com a conta do google
exports.loginSocial = async (req,res) => {

    try {

        const data = req.body;

        // retorna um erro caso o usuário não esteja autorizado
        if (!data.email_verified) return res.status(404).send(
            errorResponse(400,'verificar o usuário',new Error('Usuário não autentificado pela midia'))
        )

        // verifica se o usuario existe no banco 
        let user = await insertUser.queryUsuario(data);

        // cadastra o usuario caso não esteja cadastrado
        if (!user) {

            user = await insertUser.saveUser({
                username: data.name,
                email: data.email,
                password: data.sub
            })

            // registra a sessão
            const token = await insertSession.registerToken(user._id,user.email);
            
            res.status(201).send(
                sucessResponse(201,token,user.username)
            );  
        }

        // válida e loga
        else {

            if (validarSenha(data.sub,user.password)) {
                    
                const token = await insertSession.registerToken(user._id,user.email);
                        res.status(200).send(
                        sucessResponse(200,token,user.username,'Logado')
                    );
                }

            else return res.status(404).send(
                errorResponse(400,'verificar o usuário',new Error('Usuário de mídia inválido'))
            )
        }
    }

    catch(e) {

        res.status(500).send(
            errorResponse(500,'entrar com o google',e)
        )
    }
}

// deleta um usuario do sistema
exports.delete = async (req,res) => {

    try {
        
        // descriptografa o token do usuario para pegar o ID 
        const token = descriptografar(req.body.token);

        const user = await validarExistenciaUsuario(token);

        // deleta o usuário do sistema
        await insertUser.deleteUser(user._id);

        res.status(204).send()       
    }

    catch(e) {
        res.status(500).send(
            errorResponse(500,'deletar o usuario',e)
        );
    }
}

// inseri um code de recuperação no banco de dados
exports.recuperarSenha = async (req,res) => {
    
    try {

        // pega o email que deseja validar
        const userSelected = await validarExistenciaUsuario(req.body)

        // adicionar codigo para recuperação no registro do usuario
        const recoveryCode = await insertUser.insertRecoveryCode(userSelected._id);
 
        // envia email com o codigo de recuperação
        await enviarEmailRedefinirSenha(userSelected.email, recoveryCode)

        res.status(200).send(
            simpleResponse(200,'Email para recuperação enviado')
        )
    }

    catch(e) {
        res.status(500).send(
            errorResponse(500,'enviar email de recuperação de senha',e.message)
        );
    }
}

// valida se o recoveryCode é válido e gera um token caso for
exports.validarRecoveryCode = async (req,res) => {
    
    try {

        // espera um email
        const userSelect = await validarExistenciaUsuario(req.body);
        
        // valida o codigo de verificação
        if (req.body.recoveryCode == userSelect.recoveryCode){
            
            // limpa o codigo de recuperação
            await insertUser.clearRecoveryCode(userSelect._id);

            // cadastra um token para para ele
            const token = await insertResetPass.registerToken(userSelect._id,userSelect.email);
       
            res.status(200).send({
                status: 200,
                token
            });  
        }

        else {
            res.status(400).send(
                simpleResponse(400, 'código incorreto')
            );
        }
    }

    catch(e) {
        console.log()
        res.status(500).send(
            errorResponse(500,'validar código de senha',e.message)
        );
    }
}

// muda a senha no banco de dados
exports.cadastrarNovaSenha = async (req,res) => {
    
    try {
        
        // valida se o token foi gerado
        const validateToken = await insertResetPass.getToken(req.body.token);

        if(Boolean(validateToken)) {

            // criptografar a senha
            // validar a senha
            await insertUser.updatePassword(validateToken.userId, req.body.password);
            
            res.status(200).send(
                simpleResponse(200,"sucesso ao alterar a senha")
            )
        }
    }

    catch(e) {
        console.log(e)
        res.status(500).send(
            errorResponse(500,'validar código de senha',e.message)
        );
    }
}