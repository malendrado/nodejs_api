'use strict'

module.exports = {
    'GET /patients/':{
		controller: 'mysqlController/patientsController',
		action: 'getAll',
        auth: false
	},
	'GET /patients/:id':{
		controller: 'mysqlController/patientsController',
		action: 'getById',
        auth: true
	},
    'POST /patients/create/':{
		controller: 'mysqlController/patientsController',
		action: 'create',
        auth: true,
		dataRequired: ['rut', 'nombres', 'apellidos', 'direccion', 'genero', 'fecha_nacimiento']
	},
    'PUT /patients/updateById/:id':{
		controller: 'mysqlController/patientsController',
		action: 'updateById',
        auth: true
	},
    'DELETE /patients/deleteById/:id':{
		controller: 'mysqlController/patientsController',
		action: 'deleteById',
        auth: true
	}
}