const MysqlService = require('../../services/mysqlService');
const helperService = require('../../services/helperService');
const responseService = require('../../services/responseService');

async function getAll(_ctx) {
    try {
      let query = "SELECT * FROM cm_especialidades where id > 0";
      const result = await MysqlService.poolQuery(query, []);
      if(result.length > 0) {
        _ctx.body = responseService.getStandardResponse(0, "OK", result);
      } else {
        _ctx.body = responseService.getStandardResponseError(1, "No hay especialidades registradas");
      }
    } catch (error) {
      _ctx.body = responseService.getStandardResponseError(2, error.message);
    }
}

async function getById(_ctx) {
    const { params } = _ctx;
    try {
      let query = "SELECT * FROM cm_especialidades where id > 0 and id = ?";
      const result = await MysqlService.poolQuery(query, [params.id]);
      if(result.length > 0) {
        _ctx.body = responseService.getStandardResponse(0, "OK", result);
      } else {
        _ctx.body = responseService.getStandardResponseError(1, "Especialidad no registrada");
      }
  } catch (error) {
      _ctx.body = responseService.getStandardResponseError(2, error.message);
    }
}

async function getByName(_ctx) {
    const { params } = _ctx;
    try {
      let query = "SELECT * FROM cm_especialidades where id > 0 and nombre like concat('%', ?, '%')";
      const result = await MysqlService.poolQuery(query, [params.nombre]);
      if(result.length > 0) {
        _ctx.body = responseService.getStandardResponse(0, "OK", result);
      } else {
        _ctx.body = responseService.getStandardResponseError(1, "Especialidad no registrada");
      }
  } catch (error) {
      _ctx.body = responseService.getStandardResponseError(2, error.message);
    }
}

async function create(_ctx) {
    const { params } = _ctx;
    try {
      params.fecha_registro = helperService.dateNow();
      
      let query = "SELECT id from cm_especialidades where nombre = ?";
      const result = await MysqlService.poolQuery(query, [params.nombre]);
      if(result.length == 0) {
        const insertData = helperService.insertData('cm_especialidades', params);
        const result = await MysqlService.poolQuery(insertData[0], insertData[1]);
        if(result.insertId > 0)
          _ctx.body = responseService.getStandardResponse(0, "Registro creado", null);
        else
          _ctx.body = responseService.getStandardResponse(1, "Registro no creado", null);    
      } else {
        _ctx.body = responseService.getStandardResponse(1, "Especialidad ya esta registrada", result[0]);
      }
    } catch (error) {
      _ctx.body = responseService.getStandardResponseError(2, error.message);
    }
}

async function updateById(_ctx) {
    const { params } = _ctx;
    try {
      params.fecha_modificacion = helperService.dateNow();

      const update = helperService.updateData('cm_especialidades', params);
      const result = await MysqlService.poolQuery(update[0], update[1]);
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
      const dltData = helperService.deleteData("cm_especialidades", params);
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
    getByName,
    create,
    updateById,
    deleteById
}