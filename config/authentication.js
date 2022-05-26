const jwt = require('jsonwebtoken');

function validateToken(ctx){
    // get auth header value
    const authHeader = ctx.request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null || authHeader == undefined) return {status: 401, message: {code: 'AuthError', msg: 'Access denied'}};

    return jwt.verify(token, Koa.config.secretKey, err => {      
        if (err)
            return false;
        else
            return true;
    });    
}

function sign(payload){
    const token = jwt.sign(payload, Koa.config.secretKey, {
        expiresIn: "1d"
    });
    return token;
}

module.exports = {
    validateToken,
    sign
};