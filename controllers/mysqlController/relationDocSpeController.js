const MysqlService = require('../../services/mysqlService');
const helperService = require('../../services/helperService');
const responseService = require('../../services/responseService');

async function getAll(_ctx) {
    try {
      let query = `SELECT *,
      (select concat(nombres, ' ', apellidos) from cm_medicos where id = t.id_medico) as nombre_medico,
      (select nombre from cm_especialidades where id = t.id_especialidad) as nombre_especialidad
      FROM cm_medicos_especialidades t where id > 0 `;
      const result = await MysqlService.poolQuery(query, []);
      if(result.length > 0) {
        _ctx.body = responseService.getStandardResponse(0, "OK", result);
      } else {
        _ctx.body = responseService.getStandardResponseError(1, "No se encontraron relaciones entre doctores y especialidades");
      }
    } catch (error) {
      _ctx.body = responseService.getStandardResponseError(2, error.message);
    }
}

async function getByIdDoctor(_ctx) {
    const { params } = _ctx;
    try {
      let query = `SELECT *,
      (select concat(nombres, ' ', apellidos) from cm_medicos where id = t.id_medico) as nombre_medico,
      (select nombre from cm_especialidades where id = t.id_especialidad) as nombre_especialidad
      FROM cm_medicos_especialidades t where id > 0  and id_medico = ?`;
      const result = await MysqlService.poolQuery(query, [params.id_medico]);
      if(result.length > 0) {
        _ctx.body = responseService.getStandardResponse(0, "OK", result);
      } else {
        _ctx.body = responseService.getStandardResponseError(1, "Medico sin especialidades relacionadas");
      }
    } catch (error) {
      _ctx.body = responseService.getStandardResponseError(2, error.message);
    }
}

async function getByIdSpecialty(_ctx) {
    const { params } = _ctx;
    try {
      let query = `SELECT *,
      (select concat(nombres, ' ', apellidos) from cm_medicos where id = t.id_medico) as nombre_medico,
      (select nombre from cm_especialidades where id = t.id_especialidad) as nombre_especialidad
      FROM cm_medicos_especialidades t where id > 0  and id_especialidad = ?`;
      const result = await MysqlService.poolQuery(query, [params.id_especialidad]);
      if(result.length > 0) {
        _ctx.body = responseService.getStandardResponse(0, "OK", result);
      } else {
        _ctx.body = responseService.getStandardResponseError(1, "Especialidad sin medicos relacionados");
      }
    } catch (error) {
      _ctx.body = responseService.getStandardResponseError(2, error.message);
    }
}

async function create(_ctx) {
    const { params } = _ctx;
    try {
      params.fecha_registro = helperService.dateNow();

      let query1 = "SELECT id from cm_medicos where id = ?";
      let result1 = await MysqlService.poolQuery(query1, [params.id_medico]);
      if(result1.length == 0) {
        _ctx.body = responseService.getStandardResponse(0, "Medico ingresado no existe", null);
          return
      }

      query1 = "SELECT id from cm_especialidades where id = ?";
      result1 = await MysqlService.poolQuery(query1, [params.id_especialidad]);
      if(result1.length == 0) {
        _ctx.body = responseService.getStandardResponse(0, "Especialidad ingresado no existe", null);
          return
      }
      
      let query = "SELECT id from cm_medicos_especialidades where id_medico = ? and id_especialidad = ?";
      const result = await MysqlService.poolQuery(query, [params.id_medico, params.id_especialidad]);
      if(result.length == 0) {
        const insertData = helperService.insertData('cm_medicos_especialidades', params);
        const result = await MysqlService.poolQuery(insertData[0], insertData[1]);
        if(result.insertId > 0)
          _ctx.body = responseService.getStandardResponse(0, "Registro creado", null);
        else
          _ctx.body = responseService.getStandardResponse(1, "Registro no creado", null);    
      } else {
        _ctx.body = responseService.getStandardResponse(1, "Relacion ya esta registrada", result[0]);
      }
    } catch (error) {
      _ctx.body = responseService.getStandardResponseError(2, error.message);
    }
}

async function deleteById(_ctx) {
    const { params } = _ctx;
    try {
      const query = "DELETE from cm_medicos_especialidades where id_medico = ? and id_especialidad = ?";
      const result = await MysqlService.poolQuery(query, [params.id_medico, params.id_especialidad]);
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
    getByIdDoctor,
    getByIdSpecialty,
    create,
    deleteById
}