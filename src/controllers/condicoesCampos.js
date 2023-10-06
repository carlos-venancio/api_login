function validarSenha(senha) {
    // verifica se a senha possui pelo menos 8 caracteres
    if (senha.length < 8) {
        return false;
    }

    // verifica se a senha possui pelo menos 1 dígito
    if (!/\d/.test(senha)) {
        return false;
    }

    // verifica se a senha possui pelo menos 1 letra minúscula
    if (!/[a-z]/.test(senha)) {
        return false;
    }

    // verifica se a senha possui pelo menos 1 letra maiúscula
    if (!/[A-Z]/.test(senha)) {
        return false;
    }

    // verifica se a senha possui pelo menos 1 caractere especial
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
        return false;
    }

    // se todas as verificações passaram, a senha é válida
    return true;
}

function validarEmail(email) {
    // verificar se o email está vazio
    if (email === "") {
        return false;
    }

    // verificar se o email contém o símbolo @
    if (email.indexOf("@") === -1) {
        return false;
    }

    // verificar se o email contém o símbolo .
    if (email.indexOf(".") === -1) {
        return false;
    }

    // verificar se o email contém apenas um @
    if (email.indexOf("@") !== email.lastIndexOf("@")) {
        return false;
    }

    // verificar se o email contém apenas um .
    if (email.indexOf(".") !== email.lastIndexOf(".")) {
        return false;
    }

    // verificar se o email começa com o símbolo @
    if (email.indexOf("@") === 0) {
        return false;
    }

    // verificar se o email termina com o símbolo .
    if (email.lastIndexOf(".") === email.length - 1) {
        return false;
    }

    // verificar se o email contém apenas caracteres válidos
    if (/[^a-zA-Z0-9@._-]/.test(email)) {
        return false;
    }

    // se todas as verificações passaram, o email é válido
    return true;
}

function validarNome(nome) {
    // verifica se o nome está vazio
    if (nome === '') {
        return false;
    }

    // verifica se o nome possui apenas letras
    const letras = /^[A-Za-z]+$/;
    if (!letras.test(nome)) {
        return false;
    }

    // retorna verdadeiro se todas as verificações passaram
    return true;
}

module.exports = {validarSenha, validarEmail, validarNome};