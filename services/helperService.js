const validatePatt = require('../config/validatePattern');
const bcrypt = require('bcrypt');

function selectData(table, data) {
    let DATOS = "";
    let WHERE = "";
    let params = [];

    for(var e in data) {
        DATOS+= `${e},`;
        WHERE+= `${e} = ?,`;
        params.push(data[e]);
    }

    DATOS = DATOS.substring(0, DATOS.length - 1);
    WHERE = WHERE.substring(0, WHERE.length - 1);
    query = `SELECT ${DATOS} from ${table} where ${WHERE}`;
    return [query, params];
}

function insertData(table, data) {
    let DATOS = "";
    let VALUES = "";
    let params = [];
    for(var e in data) {
        DATOS+= `${e},`;
        VALUES+= `?,`;
        params.push(data[e])  
    }
    DATOS = DATOS.substring(0, DATOS.length - 1);
    VALUES = VALUES.substring(0, VALUES.length - 1);
    query = `INSERT ${table} (${DATOS}) VALUES (${VALUES})`;
    return [query, params];
}

function updateData(table, data) {
    let DATOS = "";
    let params = [];
    for(var e in data) {
        if(e != "id") {
            DATOS+= `${e} = ?,`
          params.push(data[e]);
        }
    }
    DATOS = DATOS.substring(0, DATOS.length - 1);
    query = `UPDATE ${table} set ${DATOS} where id = ?`;
    params.push(data.id);
    return [query, params];
}

function deleteData(table, data) {
    query = `DELETE FROM ${table} where id = ?`;
    return [query, data.id];
}

function validateDataRequired(dataRequired, paramsIn){
    if(dataRequired){
        dataRequired.forEach(element => {
            if(!paramsIn[element]){
                getStandardResponseThrow(400, 'BadRequest', null);
            }
        });    
    }
    validatePattern(paramsIn);
}

function validatePattern(paramsIn) {
    for(var e in paramsIn) {
        if(validatePatt[e]) {
            let valid = paramsIn[e].match(validatePatt[e].pattern);
            if(!valid) {
                getStandardResponseThrow(400, 'BadRequest', `${e}: ${validatePatt[e].message}`);
            }    
        }
    }
}

function getStandardResponseThrow(status, code, msg) {
    throw { status: status, message: {
            code: code,
            msg: msg
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

var hashPassword = async function(password){
    var hashPwd = await bcrypt.hashSync(password, 10);
    return hashPwd;
}

var comparePassword = async function(passReq, hashBD){
    return await bcrypt.compare(passReq, hashBD);
}

module.exports = {
    selectData,
    insertData,
    updateData,
    deleteData,
    validateDataRequired,
    validatePattern,
    getStandardResponse,
    getStandardResponseLogin,
    getStandardResponseError,
    hashPassword,
    comparePassword
}