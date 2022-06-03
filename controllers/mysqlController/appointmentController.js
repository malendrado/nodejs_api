const MysqlService = require('../../services/mysqlService');
const helperService = require('../../services/helperService');
const responseService = require('../../services/responseService');

async function getAll(_ctx) {
    try {
      let query = `SELECT *,
      (select concat(nombres, ' ', apellidos) from cm_medicos where id = t.id_medico) as nombre_medico,
      (select concat(nombres, ' ', apellidos) from cm_pacientes where id = t.id_paciente) as nombre_paciente
      FROM cm_citas t where id > 0`;
      const result = await MysqlService.poolQuery(query, []);
      if(result.length > 0) {
        _ctx.body = responseService.getStandardResponse(0, "OK", result);
      } else {
        _ctx.body = responseService.getStandardResponseError(1, "No hay citas ingresadas");
      }
    } catch (error) {
      _ctx.body = responseService.getStandardResponseError(2, error.message);
    }
}

async function getByDate(_ctx) {
  const { params } = _ctx;
  try {
    let query = "SELECT * FROM cm_citas where id > 0 and fecha_atencion = ?";
    const result = await MysqlService.poolQuery(query, [params.fecha_atencion]);
    if(result.length > 0) {
      _ctx.body = responseService.getStandardResponse(0, "OK", result);
    } else {
      _ctx.body = responseService.getStandardResponseError(1, "No hay citas para la fecha consultada");
    }
} catch (error) {
    _ctx.body = responseService.getStandardResponseError(2, error.message);
  }
}

async function getByIdDoctor(_ctx) {
    const { params } = _ctx;
    try {
      let query = "SELECT * FROM cm_citas where id > 0 and id_medico = ?";
      const result = await MysqlService.poolQuery(query, [params.id_medico]);
      if(result.length > 0) {
        _ctx.body = responseService.getStandardResponse(0, "OK", result);
      } else {
        _ctx.body = responseService.getStandardResponseError(1, "No hay citas agendadas");
      }
  } catch (error) {
      _ctx.body = responseService.getStandardResponseError(2, error.message);
    }
}

async function getByIdPatient(_ctx) {
    const { params } = _ctx;
    try {
      let query = "SELECT * FROM cm_citas where id > 0 and id_paciente = ?";
      const result = await MysqlService.poolQuery(query, [params.id_paciente]);
      if(result.length > 0) {
        _ctx.body = responseService.getStandardResponse(0, "OK", result);
      } else {
        _ctx.body = responseService.getStandardResponseError(1, "No hay citas agendadas");
      }
  } catch (error) {
      _ctx.body = responseService.getStandardResponseError(2, error.message);
    }
}

async function create(_ctx) {
  const { params } = _ctx;
  try {

    let query1 = "SELECT id from cm_medicos where id = ?";
    let result1 = await MysqlService.poolQuery(query1, [params.id_medico]);
    if(result1.length == 0) {
      _ctx.body = responseService.getStandardResponse(0, "Medico ingresado no existe", null);
        return
    }

    query1 = "SELECT id from cm_horarios where id_medico = ? and fecha_atencion = ?";
    result1 = await MysqlService.poolQuery(query1, [params.id_medico, params.fecha_atencion]);
    if(result1.length == 0) {
      _ctx.body = responseService.getStandardResponse(0, "Medico no tiene horarios en la fecha ingresada", null);
        return
    }

    query1 = "SELECT id from cm_pacientes where id = ?";
    result1 = await MysqlService.poolQuery(query1, [params.id_paciente]);
    if(result1.length == 0) {
      _ctx.body = responseService.getStandardResponse(0, "Paciente ingresado no existe", null);
        return
    }
    
    params.fecha_registro = helperService.dateNow();

    let query = "SELECT id from cm_citas where id_medico = ? and id_paciente = ? and fecha_atencion = ?";
    const result = await MysqlService.poolQuery(query, [params.id_medico, params.id_paciente, params.fecha_atencion]);
    if(result.length == 0) {
      const insertData = helperService.insertData('cm_citas', params);
      const result = await MysqlService.poolQuery(insertData[0], insertData[1]);
      if(result.insertId > 0)
        _ctx.body = responseService.getStandardResponse(0, "Registro creado", null);
      else
        _ctx.body = responseService.getStandardResponse(1, "Registro no creado", null);    
    } else {
      _ctx.body = responseService.getStandardResponse(1, "Cita ya se encuentra agendada", result[0]);
    }
  } catch (error) {
    _ctx.body = responseService.getStandardResponseError(2, error.message);
  }
}

async function updateById(_ctx) {
  const { params } = _ctx;
  try {
    params.fecha_modificacion = helperService.dateNow();
    const updData = helperService.updateData("cm_citas", params);
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
    const dltData = helperService.deleteData("cm_citas", params);
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
  getByDate,
  getByIdDoctor,
  getByIdPatient,
  create,
  updateById,
  deleteById
}