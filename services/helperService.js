const validatePatt = require('../config/validatePattern');
const bcrypt = require('bcrypt');
const responseService = require('./responseService');
const moment = require('moment');

function selectData(table, data) {
    let WHERE = "";
    let params = [];

    for(var e in data) {
        WHERE+= `${e} = ?,`;
        params.push(data[e]);
    }

    WHERE = WHERE.substring(0, WHERE.length - 1);
    query = `SELECT * from ${table} where ${WHERE}`;
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
                responseService.getStandardResponseThrow(400, 'BadRequest', null);
            }
        });    
    }
    validatePattern(paramsIn);
}

function validatePattern(paramsIn) {
    for(var e in paramsIn) {
        if(validatePatt[e] && paramsIn[e] != "" && paramsIn[e] != null) {
            let valid = paramsIn[e].match(validatePatt[e].pattern);
            if(!valid) {
                responseService.getStandardResponseThrow(400, 'BadRequest', `${validatePatt[e].message}`);
            }
            if(e == "rut") {
                if(!validateRut.validaRut(paramsIn[e]))
                    responseService.getStandardResponseThrow(400, 'BadRequest', `Rut ingresado incorrecto`);
            }
        }
    }
}

var hashPassword = async function(password){
    var hashPwd = await bcrypt.hashSync(password, 10);
    return hashPwd;
}

var comparePassword = async function(passReq, hashBD){
    return await bcrypt.compare(passReq, hashBD);
}

var validateRut = {
	// Valida el rut con su cadena completa "XXXXXXXX-X"
	validaRut : function (rutCompleto) {
		if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
			return false;
		var tmp 	= rutCompleto.split('-');
		var digv	= tmp[1]; 
		var rut 	= tmp[0];
		if ( digv == 'K' ) digv = 'k' ;
		return (validateRut.dv(rut) == digv );
	},
	dv : function(T){
		var M=0,S=1;
		for(;T;T=Math.floor(T/10))
			S=(S+T%10*(9-M++%6))%11;
		return S?S-1:'k';
	}
}

var dateNow = function() {
    return `${moment().format("YYYY-MM-DD H:mm:ss")}`;
}

module.exports = {
    selectData,
    insertData,
    updateData,
    deleteData,
    validateDataRequired,
    validatePattern,
    hashPassword,
    comparePassword,
    dateNow
}