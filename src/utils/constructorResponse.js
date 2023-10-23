function sucessResponse(statusCode=201,tokenGerado,username,msg="Cadastrado"){
    return {
        status: statusCode,
        messsage: msg + ' com sucesso!',
        token: tokenGerado,
        username: username,
        expirity: new Date().setHours(new Date().getHours() + 2)
    }
}

function errorResponse(statusCode=500,msg='consultar',e){
    return {
        status: statusCode,
        message: "Falha ao " + msg,
        error: e.message
    }
}

module.exports = {
    sucessResponse,
    errorResponse
}