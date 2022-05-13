const MysqlService = require('../../services/mysqlService');

async function getRole(_ctx) {
    const { params } = _ctx;
    try {
        let query = "SELECT * FROM adm_perfiles where id > 0 and id = ?";
        _ctx.body = await MysqlService.poolQuery(_ctx, query, [params.id_perfil]);
    } catch (error) {
        _ctx.body = {
        codResp: 1,
        glosaResp: error.message,
        };
    }
}

async function getRoleRelation(_ctx) {
    const { params } = _ctx;
    try {
        let query = "SELECT * FROM adm_perfiles_pantallas where perfil = ?";
        _ctx.body = await MysqlService.poolQuery(_ctx, query, [params.perfil]);
    } catch (error) {
        _ctx.body = {
        codResp: 1,
        glosaResp: error.message,
        };
    }
}


module.exports = {
    getRole,
    getRoleRelation
};