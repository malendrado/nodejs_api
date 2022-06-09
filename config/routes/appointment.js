'use strict'

module.exports = {
    'GET /appointment/':{
		controller: 'mysqlController/appointmentController',
		action: 'getAll',
        auth: false,		
	},
	'GET /appointment/:fecha_atencion':{
		controller: 'mysqlController/appointmentController',
		action: 'getByDate',
        auth: false,		
	},
	'GET /appointment/getByIdDoctor/:id_medico':{
		controller: 'mysqlController/appointmentController',
		action: 'getByIdDoctor',
        auth: false,		
	},
	'GET /appointment/getByIdPatient/:id_paciente':{
		controller: 'mysqlController/appointmentController',
		action: 'getByIdPatient',
        auth: false,		
	},
    'POST /appointment/create/':{
		controller: 'mysqlController/appointmentController',
		action: 'create',
        auth: true,
		dataRequired: ['id_medico', 'id_paciente', 'fecha_atencion', 'inicio']
	},
    'PUT /appointment/updateById/:id':{
		controller: 'mysqlController/appointmentController',
		action: 'updateById',
        auth: true
	},
    'DELETE /appointment/deleteById/:id':{
		controller: 'mysqlController/appointmentController',
		action: 'deleteById',
        auth: true
	}
}