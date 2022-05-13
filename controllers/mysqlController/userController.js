const MysqlService = require('../../services/mysqlService');
const helperService = require('../../services/helperService');

async function getAll(_ctx) {
  try {
    let query = "SELECT * FROM adm_usuarios where id > 0";
    const result = await MysqlService.poolQuery(query, []);
    if(result.length > 0) {
      _ctx.body = helperService.getStandardResponse(0, "OK", result);
    } else {
      _ctx.body = helperService.getStandardResponseError(1, result.sqlMessage);
    }
  } catch (error) {
    _ctx.body = helperService.getStandardResponseError(2, error.message);
  }
}

async function getById(_ctx) {
  const { params } = _ctx;
  try {
    let query = "SELECT * FROM adm_usuarios where id > 0 and id = ?";
    const result = await MysqlService.poolQuery(query, [params.id]);
    if(result.length > 0) {
      _ctx.body = helperService.getStandardResponse(0, "OK", result);
    } else {
      _ctx.body = helperService.getStandardResponseError(1, result.sqlMessage);
    }
  } catch (error) {
    _ctx.body = helperService.getStandardResponseError(2, error.message);
  }
}

async function create(_ctx) {
  const { params } = _ctx;
  try {
    let query = "SELECT id from adm_usuarios where rut = ?";
    const result = await MysqlService.poolQuery(query, [params.rut]);
    if(result.length == 0) {
      params.password = await helperService.hashPassword(params.rut);
      const insertData = helperService.insertData('adm_usuarios', params);
      const result = await MysqlService.poolQuery(insertData[0], insertData[1]);
      if(result.insertId > 0)
        _ctx.body = helperService.getStandardResponse(0, "Registro creado", null);
      else
        _ctx.body = helperService.getStandardResponse(1, "Registro no creado", null);    
    } else {
      _ctx.body = helperService.getStandardResponse(1, "Rut ingresado ya existe", result[0]);
    }
  } catch (error) {
    _ctx.body = helperService.getStandardResponseError(2, error.message);
  }
}

async function updateById(_ctx) {
  const { params } = _ctx;
  try {
    const updData = helperService.updateData("adm_usuarios", params);
    const result = await MysqlService.poolQuery(updData[0], updData[1]);
    if(result.affectedRows > 0)
      _ctx.body = helperService.getStandardResponse(0, "Registro actualizado", null);
    else
      _ctx.body = helperService.getStandardResponse(1, "Registro no actualizado", null);
  } catch (error) {
    _ctx.body = helperService.getStandardResponseError(2, error.message);
  }
}

async function deleteById(_ctx) {
  const { params } = _ctx;
  try {
    const dltData = helperService.deleteData("adm_usuarios", params);
    const result = await MysqlService.poolQuery(dltData[0], dltData[1]);
    if(result.affectedRows > 0)
      _ctx.body = helperService.getStandardResponse(0, "Registro eliminado", null);
    else
      _ctx.body = helperService.getStandardResponse(1, "Registro no eliminado", null);
  } catch (error) {
    _ctx.body = helperService.getStandardResponseError(2, error.message);
  }
}


async function getUserRelacion(_ctx) {
  const { params } = _ctx;
  try {
      let query = "SELECT * FROM adm_usuarios_relacion where id_usuario = ? and id_sistema = ?";
      _ctx.body = await MysqlService.poolQuery(_ctx, query, [params.id_usuario, params.id_sistema]);
  } catch (error) {
      _ctx.body = {
          codResp: 1,
          glosaResp: error.message,
      };
  }
}

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
    getUserRelacion
};