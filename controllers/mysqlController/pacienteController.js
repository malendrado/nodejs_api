const MysqlService = require('../../services/mysqlService');
const helperService = require('../../services/helperService');
const responseService = require('../../services/responseService');

async function getAll(_ctx) {
    try {
      let query = "SELECT * FROM cm_pacientes where id > 0";
      const result = await MysqlService.poolQuery(query, []);
      if(result.length > 0) {
        _ctx.body = responseService.getStandardResponse(0, "OK", result);
      } else {
        _ctx.body = responseService.getStandardResponseError(1, "No hay pacientes registrados");
      }
    } catch (error) {
      _ctx.body = responseService.getStandardResponseError(2, error.message);
    }
}

async function getById(_ctx) {
  const { params } = _ctx;
  try {
    let query = "SELECT * FROM cm_pacientes where id > 0 and id = ?";
    const result = await MysqlService.poolQuery(query, [params.id]);
    if(result.length > 0) {
      _ctx.body = responseService.getStandardResponse(0, "OK", result);
    } else {
      _ctx.body = responseService.getStandardResponseError(1, "Paciente no registrado");
    }
} catch (error) {
    _ctx.body = responseService.getStandardResponseError(2, error.message);
  }
}

async function create(_ctx) {
  const { params } = _ctx;
  try {
    params.fecha_registro = helperService.dateNow();

    let query = "SELECT id from cm_pacientes where rut = ?";
    const result = await MysqlService.poolQuery(query, [params.rut]);
    if(result.length == 0) {
      const insertData = helperService.insertData('cm_pacientes', params);
      const result = await MysqlService.poolQuery(insertData[0], insertData[1]);
      if(result.insertId > 0)
        _ctx.body = responseService.getStandardResponse(0, "Registro creado", null);
      else
        _ctx.body = responseService.getStandardResponse(1, "Registro no creado", null);    
    } else {
      _ctx.body = responseService.getStandardResponse(1, "Rut ingresado ya existe", result[0]);
    }
  } catch (error) {
    _ctx.body = responseService.getStandardResponseError(2, error.message);
  }
}

async function updateById(_ctx) {
  const { params } = _ctx;
  try {
    params.fecha_modificacion = helperService.dateNow();

    const updData = helperService.updateData("cm_pacientes", params);
    const result = await MysqlService.poolQuery(updData[0], updData[1]);
    if(result.affectedRows > 0)
      _ctx.body = responseService.getStandardResponse(0, "Registro actualizado", null);
    else
      _ctx.body = responseService.getStandardResponse(1, "Registro no actualizado", null);
  } catch (error) {
    _ctx.body = responseService.getStandardResponseError(2, error.message);
  }
}

async function deleteById(_ctx) {
  const { params } = _ctx;
  try {
    const dltData = helperService.deleteData("cm_pacientes", params);
    const result = await MysqlService.poolQuery(dltData[0], dltData[1]);
    if(result.affectedRows > 0)
      _ctx.body = responseService.getStandardResponse(0, "Registro eliminado", null);
    else
      _ctx.body = responseService.getStandardResponse(1, "Registro no eliminado", null);
  } catch (error) {
    _ctx.body = responseService.getStandardResponseError(2, error.message);
  }
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}