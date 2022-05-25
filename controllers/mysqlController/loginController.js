const MysqlService = require('../../services/mysqlService');
const authentication = require('../../config/authentication');
const helperService = require('../../services/helperService');
const responseService = require('../../services/responseService');

async function loginRut(_ctx) {
    const { params } = _ctx;
    try {
        let pass = await helperService.hashPassword(params.pass);
        let query = "SELECT * FROM adm_usuarios where rut = ? limit 1";
        let param = [params.rut, pass];
        const result = await MysqlService.poolQuery(query, param);
        if(result.length > 0){
          const equal = await helperService.comparePassword(params.pass, result[0].password);
          if(equal){
            delete result[0].password;
            const token = authentication.sign(params);
            _ctx.body = responseService.getStandardResponseLogin(0, "OK", result, token);
          }
          else{
            _ctx.body = responseService.getStandardResponseError(1, "Email o password incorrectos");
          }
        } else {
          _ctx.body = responseService.getStandardResponseError(1, result.sqlMessage);
        }
    } catch (error) {
      _ctx.body = responseService.getStandardResponseError(1, error.message);
    }
}

async function loginEmail(_ctx) {
    const { params } = _ctx;
    try {
      let pass = await helperService.hashPassword(params.pass);
      let query = "SELECT * FROM adm_usuarios where mail = ? limit 1";
      let param = [params.email, pass];
      const result = await MysqlService.poolQuery(query, param);
      if(result.length > 0){
        const equal = await helperService.comparePassword(params.pass, result[0].password);
        if(equal){
          delete result[0].password;
          const token = authentication.sign(params)
          _ctx.body = responseService.getStandardResponseLogin(0, "OK", result, token);
        }
        else{
          _ctx.body = responseService.getStandardResponseError(1, "Email o password incorrectos");
        }
      } else {
        _ctx.body = responseService.getStandardResponseError(1, result.sqlMessage);
      }
    } catch (error) {
      _ctx.body = {
        codResp: 1,
        glosaResp: error.message,
      };
    }
}

async function loginUpdatePassword(_ctx) {
  const { params } = _ctx;
  try {
    params.password = await helperService.hashPassword(params.password);
    const updData = helperService.updateData("adm_usuarios", params);
    const result = await MysqlService.poolQuery(updData[0], updData[1]);
    if(result.affectedRows > 0)
      _ctx.body = responseService.getStandardResponse(0, "Contraseña actualizada", null);
    else
      _ctx.body = responseService.getStandardResponse(1, "Contraseña no actualizado", null);
  } catch (error) {
    _ctx.body = responseService.getStandardResponseError(2, error.message);
  }
}

async function forgotPassword(_ctx) {
  const { params } = _ctx;
  let query = "SELECT * FROM adm_usuarios where rut = ? limit 1";
  let param = [params.email];
  const result = await MysqlService.poolQuery(query, param);
  _ctx.body = result;
}
  
module.exports = {
    loginRut,
    loginEmail,
    loginUpdatePassword,
    forgotPassword
}