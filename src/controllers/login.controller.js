"use strict";

const {
  validarEmailAndSenhaAndNome,
  validarTentativaDeInjecao,
  validarExistenciaUsuario,
  validarSenha,
} = require("./validacao");
const insertUser = require("../repositories/repositories.users");
const insertSession = require("../repositories/repositories.session");
const insertResetPass = require("../repositories/repositories.resetPassToken");
const insertUserSocial = require("../repositories/repositories.userSocial");
const {
  sucessResponse,
  errorResponse,
  simpleResponse,
} = require("../utils/constructorResponse");
const { validarSenhaCriptografada, hashSenha } = require("../controllers/criptografar");
const { descriptografar } = require("./criptografar");
const { enviarEmailRedefinirSenha } = require("../utils/enviarEmail");

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
exports.get = async (req, res) => {

    // pega o email e a senha independente de onde venha
    const dados = Object.entries(req.query) == 0 ? req.body : req.query;

    let statusCode = 500;

    try {
        
        // pega o email e a senha independente de onde venha
        const dados = Object.entries(req.query) == 0 ? req.body : req.query
        
        const errorData = validarTentativaDeInjecao(dados);

        if (validarTentativaDeInjecao(dados)) return es.status(400).send(
            errorResponse(400,'validar os dados',{message:errorData})
        )
        
        // consulta o usuário
        const userSelected = await validarExistenciaUsuario(dados);
        
        // testa a senha dependendo se esta criptografada ou não 
        const senhaValida = userSelected.password[0] !== "$" ? userSelected.password === dados.password : validarSenhaCriptografada(dados.password,userSelected.password)

        // é verdadeiro caso a senha for válida e falso caso for inválida 
        if (!senhaValida) {
            statusCode = 400;
            throw new Error('Usuário não encontrado')
        }    
        // registra a sessão
        const token = await insertSession.registerToken(userSelected._id,userSelected.email);
        
        res.status(200).send(
            sucessResponse(200,token,userSelected.username,'Logado')
        );       
    }

    catch(e) {
        console.log(e)
        res.status(statusCode).send(
            errorResponse(statusCode,'consultar usuário',e)
        )
    }
}

// realiza o cadastro do usuario e retorna o token da sessão
exports.post = async (req, res) => {

  
  try {
    // validação dos dados
    const errorData = validarEmailAndSenhaAndNome(req.body);

    if (errorData) return res.status(400).send(errorResponse(400, "validar os dados", { message: errorData }))

    // cadastra o usuario
    const usuarioCadastrado = await insertUser.saveUser(req.body);

    // cadastra uma sessão para ele
    const token = await insertSession.registerToken(
      usuarioCadastrado._id,
      usuarioCadastrado.email
    );

    res
      .status(201)
      .send(sucessResponse(201, token, usuarioCadastrado.username));
  } catch (e) {
    // formata mensagem para caso o usuário já existir
    if (e.message.includes("E11000") & e.message.toLowerCase().includes("email"))   e.message = "Email já está em uso";

    res.status(500).send(errorResponse(500, "consultar usuário", e));
  }
}

// rota que permite o login ou cadastrado com a conta do google
exports.loginSocial = async (req, res) => {
  try {
    const data = req.body;
    let statusCode = 201;
    const texto = "Cadastrado";

    // retorna um erro caso o usuário não esteja autorizado
    if (!data.email_verified)
      return res
        .status(404)
        .send(
          errorResponse(
            400,
            "verificar o usuário",
            new Error("Usuário não autentificado pela midia")
          )
        );

    // verifica se o usuario existe no banco
    let user = await insertUserSocial.queryUserSocial(data.email);

    // cadastra o usuario caso não esteja cadastrado
    if (!user)
      user = await insertUserSocial.saveUserSocial(
        data.username,
        data.email,
        data.sub
      );
    // válida e loga
    else {
      if (validarSenhaCriptografada(data.sub, user.password)) {
        statusCode = 200;
        texto = "Logado";
      } else throw new Error("Usuário de mídia inválido");
    }

    // registra a sessão
    const token = await insertSession.registerToken(user._id, user.email);

    res
      .status(statusCode)
      .send(sucessResponse(statusCode, token, user.username, texto));
  } catch (e) {
    res.status(500).send(errorResponse(500, "entrar com o google", e));
  }
};

// deleta um usuario do sistema
exports.delete = async (req, res) => {
  try {
    // descriptografa o token do usuario para pegar o ID
    const token = descriptografar(req.body.token);

    const user = await validarExistenciaUsuario(token);

    // deleta o usuário do sistema
    await insertUser.deleteUser(user._id);

    res.status(204).send();
  } catch (e) {
    res.status(500).send(errorResponse(500, "deletar o usuario", e));
  }
};

// inseri um code de recuperação no banco de dados
exports.recuperarSenha = async (req, res) => {
  try {
    // pega o email que deseja validar
    const userSelected = await validarExistenciaUsuario(req.body);

    // adicionar codigo para recuperação no registro do usuario
    const recoveryCode = await insertUser.insertRecoveryCode(userSelected._id);

    // envia email com o codigo de recuperação
    await enviarEmailRedefinirSenha(userSelected.email, recoveryCode);

    res.status(200).send(simpleResponse(200, "Email para recuperação enviado"));
  } catch (e) {
    console.log(e.message);
    res
      .status(500)
      .send(errorResponse(500, "enviar email de recuperação de senha", e));
  }
};

// valida se o recoveryCode é válido e gera um token caso for
exports.validarRecoveryCode = async (req, res) => {
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
            errorResponse(500,'validar código de senha',e)
        );
    }
}

// muda a senha no banco de dados
exports.cadastrarNovaSenha = async (req, res) => {
  try {
    // consulta o token foi gerado
    const validateToken = await insertResetPass.getToken(req.body.token);

    if (Boolean(validateToken)) {
      // criptografar a senha
      // validar a senha
      await insertUser.updatePassword(validateToken.userId, req.body.password);

      res.status(200).send(simpleResponse(200, "sucesso ao alterar a senha"));
    }
  } catch (e) {
    res.status(500).send(errorResponse(500, "validar código de senha", e));
  }
};

// muda a senha usando a antiga senha
exports.trocarSenha = async (req, res) => {
  try {
    const dados = descriptografar(req.body.token);

    // consulta o usuário
    const userSelected = await validarExistenciaUsuario(dados);

    // testa a senha dependendo se esta criptografada ou não
    const senhaValida =
      userSelected.password[0] !== "$"
        ? userSelected.password === req.body.password
        : validarSenhaCriptografada(req.body.password, userSelected.password);

    // é verdadeiro caso a senha for válida e falso caso for inválida
    if (!senhaValida) throw new Error("Usuário não encontrado");

    const validade = validarSenha(req.body.newPassword);

    // valida a nova senha
    if (validade) {
      res.status(400).send({
        status: 400,
        message: validade,
      });
      return;
    }

    userSelected.password = hashSenha(req.body.newPassword)
    userSelected.save()
    
    res.status(200).send(simpleResponse(200, "Senha trocada com sucesso"));
  } catch (e) {
    res.status(500).send(errorResponse(500, "trocar a senha", e));
  }
}

// retorna informações do usuario
exports.infoUser = async(req,res) => {
    try{
        const token = descriptografar(req.body.token);
        const { username, email, lenPassword } = await insertUser.getUserById(token.userId);

        res.status(200).send({
            status: 200,
            data: {
                username,
                email,
                lenPassword: lenPassword || 10
            }
        })
    }
    catch (e) {
        res.status(500).send(errorResponse(500, "obter informaçõe do usuario", e));
      }
}