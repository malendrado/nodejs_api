
function getStandardResponseThrow(status, code, msg) {
    throw { status: status, message: {
            codResp: code,
            glosaResp: msg
        }
    };
}

function getStandardResponse(codResp, glosaResp, data){
    return {
        codResp: codResp,
        glosaResp : glosaResp,
        data : data,
     }
}

function getStandardResponseLogin(codResp, glosaResp, data, token){
    return {
        codResp: codResp,
        glosaResp : glosaResp,
        data : data,
        token: token
     }
}

function getStandardResponseError(codResp, glosaResp){
    return {
        codResp: codResp,
        glosaResp : glosaResp
     }
}

module.exports = {
    getStandardResponseThrow,
    getStandardResponse,
    getStandardResponseLogin,
    getStandardResponseError
}