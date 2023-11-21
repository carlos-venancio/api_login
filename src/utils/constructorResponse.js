function sucessResponse(statusCode=201,tokenGerado,username,msg="Cadastrado"){
    return {
        status: String(statusCode),
        messsage: msg + ' com sucesso!',
        token: tokenGerado,
        username: username,
        expirity: new Date().setHours(new Date().getHours() + 2)
    }
}

function simpleResponse(status,message){
    return {
        status,
        message
    }
}

function errorResponse(status=500,msg='consultar',e){
    return {
        status,
        message: "Falha ao " + msg,
        error: e.message
    }
}

module.exports = {
    sucessResponse,
    errorResponse,
    simpleResponse
}