'use strict'

module.exports = {
    'GET /relationDocSpe/':{
		controller: 'mysqlController/relationDocSpeController',
		action: 'getAll',
        auth: false,		
	},
	'GET /relationDocSpe/getByIdDoctor/:id_medico':{
		controller: 'mysqlController/relationDocSpeController',
		action: 'getByIdDoctor',
        auth: false,		
	},
	'GET /relationDocSpe/getByIdSpecialty/:id_especialidad':{
		controller: 'mysqlController/relationDocSpeController',
		action: 'getByIdSpecialty',
        auth: false,		
	},
	'POST /relationDocSpe/create':{
		controller: 'mysqlController/relationDocSpeController',
		action: 'create',
        auth: true,
		dataRequired: ['id_medico', 'id_especialidad']
	},
    'DELETE /relationDocSpe/deleteById/:id_medico/:id_especialidad':{
		controller: 'mysqlController/relationDocSpeController',
		action: 'deleteById',
        auth: true
	}
}