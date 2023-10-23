function validarSenha(senha) {

    // verifica se a senha foi passado 
    if (senha == null){
        return "Informe uma senha"
    }
     
    // verifica se a senha possui pelo menos 8 caracteres
    if (senha.length < 8) {
        return "A senha deve possuir pelo menos 8 caracteres";
    }

    // verifica se a senha possui pelo menos 1 dígito
    if (!/\d/.test(senha)) {
        return "A senha deve possuir pelo menos 1 dígito";
    }

    // verifica se a senha possui pelo menos 1 letra minúscula
    if (!/[a-z]/.test(senha)) {
        return "A senha deve possuir pelo menos 1 letra minúsucula";
    }

    // verifica se a senha possui pelo menos 1 letra maiúscula
    if (!/[A-Z]/.test(senha)) {
        return "A senha deve possuir pelo menos 1 letra maiúscula";
    }

    // verifica se a senha possui pelo menos 1 caractere especial
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
        return "A senha deve possuir pelo menos 1 caractere especial";
    }

    // se todas as verificações passaram, a senha é válida
    return '';
}

function validarEmail(email) {
    
    // verifica se o email foi passado 
    if (email == null){
        return "Informe um email"
    }

    // verificar se o email está vazio
    if (email === "") {
        return "O email não pode ser vazio";
    }

    // verificar se o email contém o símbolo @
    if (email.indexOf("@") === -1) {
        return "O email deve possuir o símbolo @";
    }

    // verificar se o email contém o símbolo .
    if (email.indexOf(".") === -1) {
        return "O email deve possuir o símbolo .";
    }

    // verificar se o email contém apenas um @
    if (email.indexOf("@") !== email.lastIndexOf("@")) {
        return "O email deve possuir o apenas um símbolo @";
    }

    // verificar se o email contém apenas um .
    if (email.indexOf(".") !== email.lastIndexOf(".")) {
        return "O email deve possuir o apenas um símbolo .";
    }

    // verificar se o email começa com o símbolo @
    if (email.indexOf("@") === 0) {
        return "O email não deve possuir começar com o símbolo @";
    }

    // verificar se o email termina com o símbolo .
    if (email.lastIndexOf(".") === email.length - 1) {
        return "O email não deve possuir terminar com ponto";
    }

    // verificar se o email contém apenas caracteres válidos
    if (/[^a-zA-Z0-9@._-]/.test(email)) {
        return "O email deve conter apenas caracteres válidos: a-zA-Z0-9@._-";
    }

    // se todas as verificações passaram, o email é válido
    return '';
}

function validarNome(nome) {

    // verifica se o nome foi passado 
    if (nome == null){
        return "Informe um nome"
    }

    // verifica se o nome está vazio
    if (nome === '') {
        return "O nome não pode ser vazio";
    }

    // verifica se o nome possui apenas letras
    const letras = /^[A-Za-z]+$/;
    if (!letras.test(nome)) {
        return "O nome deve possuir apenas letras";
    }

    // retorna verdadeiro se todas as verificações passaram
    return '';
}

function validarEmailAndSenhaAndNome(data) {

    // executa a validação dos dados
    const nomeValidado =  validarNome(data.username);
    const emailValidado = validarEmail(data.email);
    const senhaValidada =  validarSenha(data.password);

    // lança um erro caso o email for inválido
    if (Boolean(emailValidado)) throw new Error(emailValidado);

    // lança um erro caso a senha for inválido
    else if (Boolean(senhaValidada)) throw new Error(senhaValidada);

    // lança um erro caso o nome for inválido
    else if (Boolean(nomeValidado)) throw new Error(nomeValidado);
}

function validarTentativaDeInjecao(data){
    const values = Object.values(data)

    for(dado in values) {
        // verifica se todos os parametros são legais e não tentativas de injeção 
        if (String(values[dado]).includes('$')) throw new Error('Caracter inválido "$"')    
    }
}

module.exports = { 
    validarTentativaDeInjecao, 
    validarEmailAndSenhaAndNome 
};