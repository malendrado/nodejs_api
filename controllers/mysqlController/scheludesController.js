const MysqlService = require('../../services/mysqlService');
const helperService = require('../../services/helperService');
const responseService = require('../../services/responseService');

async function getAll(_ctx) {
    try {
      let query = "SELECT *, (select concat(nombres, ' ', apellidos) from cm_medicos where id = id_medico) as nombre_medico FROM cm_horarios where id > 0";
      const result = await MysqlService.poolQuery(query, []);
      if(result.length > 0) {
        _ctx.body = responseService.getStandardResponse(0, "OK", result);
      } else {
        _ctx.body = responseService.getStandardResponseError(1, "No hay horarios registrados");
      }
    } catch (error) {
      _ctx.body = responseService.getStandardResponseError(2, error.message);
    }
}

async function getById(_ctx) {
    const { params } = _ctx;
    try {
      let query = "SELECT *, (select concat(nombres, ' ', apellidos) from cm_medicos where id = id_medico) as nombre_medico FROM cm_horarios where id > 0 and id = ?";
      const result = await MysqlService.poolQuery(query, [params.id]);
      if(result.length > 0) {
        _ctx.body = responseService.getStandardResponse(0, "OK", result);
      } else {
        _ctx.body = responseService.getStandardResponseError(1, "Horario no registrado");
      }
  } catch (error) {
      _ctx.body = responseService.getStandardResponseError(2, error.message);
    }
}

async function create(_ctx) {
    const { params } = _ctx;
    try {
      params.fecha_registro = helperService.dateNow();

      let queryMedico = "SELECT id from cm_medicos where id = ?";
      const resultMedico = await MysqlService.poolQuery(queryMedico, [params.id_medico]);
      if(resultMedico.length == 0) {
        _ctx.body = responseService.getStandardResponse(0, "Medico ingresado no existe", null);
          return
      }
      
      let query = "SELECT id from cm_horarios where id_medico = ? and fecha_atencion = ? and hora_inicio = ? and hora_termino = ?";
      const result = await MysqlService.poolQuery(query, [params.id_medico, params.fecha_atencion, params.hora_inicio, params.hora_termino]);
      if(result.length == 0) {
        const insertData = helperService.insertData('cm_horarios', params);
        const result = await MysqlService.poolQuery(insertData[0], insertData[1]);
        if(result.insertId > 0)
          _ctx.body = responseService.getStandardResponse(0, "Registro creado", null);
        else
          _ctx.body = responseService.getStandardResponse(1, "Registro no creado", null);    
      } else {
        _ctx.body = responseService.getStandardResponse(1, "Horario ya esta registrado", result[0]);
      }
    } catch (error) {
      _ctx.body = responseService.getStandardResponseError(2, error.message);
    }
}

async function updateById(_ctx) {
    const { params } = _ctx;
    try {
      params.fecha_modificacion = helperService.dateNow();

      let queryMedico = "SELECT id from cm_medicos where id = ?";
      const resultMedico = await MysqlService.poolQuery(queryMedico, [params.id_medico]);
      if(resultMedico.length == 0) {
        _ctx.body = responseService.getStandardResponse(0, "Medico ingresado no existe", null);
          return
      }

      let query = "SELECT id from cm_horarios where id_medico = ? and fecha_atencion = ? and hora_inicio = ? and hora_termino = ?";
      const result = await MysqlService.poolQuery(query, [params.id_medico, params.fecha_atencion, params.hora_inicio, params.hora_termino]);
      if(result.length == 0) {
        const insertData = helperService.updateData('cm_horarios', params);
        const result = await MysqlService.poolQuery(insertData[0], insertData[1]);
        if(result.affectedRows > 0)
            _ctx.body = responseService.getStandardResponse(0, "Registro actualizado", null);
        else
            _ctx.body = responseService.getStandardResponse(1, "Registro no actualizado", null);
      } else {
        _ctx.body = responseService.getStandardResponse(1, "Horario ya esta registrado", result[0]);
      }

    } catch (error) {
      _ctx.body = responseService.getStandardResponseError(2, error.message);
    }
}
  
async function deleteById(_ctx) {
    const { params } = _ctx;
    try {
      const dltData = helperService.deleteData("cm_horarios", params);
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