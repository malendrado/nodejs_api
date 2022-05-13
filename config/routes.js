'use strict';
/* jshint strict: false, esversion: 6 */

module.exports = {
	'GET /health/':{
		controller: 'healthController',
		action: 'health',
        auth: false
	},
	'POST /loginRut/':{
		controller: 'mysqlController/loginController',
		action: 'loginRut',
        auth: false,
		dataRequired: ['rut', 'pass']
	},
	'POST /loginEmail/':{
		controller: 'mysqlController/loginController',
		action: 'loginEmail',
        auth: false,
		dataRequired: ['email', 'pass']
	},
	'PUT /loginUpdatePassword/:id':{
		controller: 'mysqlController/loginController',
		action: 'loginUpdatePassword',
        auth: false,
		dataRequired: ['password']
	},
	'PUT /forgotPassword/':{
		controller: 'mysqlController/loginController',
		action: 'loginUpdatePassword',
        auth: false,
		dataRequired: ['rut']
	},
	'GET /users/':{
		controller: 'mysqlController/userController',
		action: 'getAll',
        auth: true
	},
	'GET /users/getById/:id':{
		controller: 'mysqlController/userController',
		action: 'getById',
        auth: true
	},
	'POST /users/create/':{
		controller: 'mysqlController/userController',
		action: 'create',
        auth: false,
		dataRequired: ['rut', 'nombres', 'paterno', 'materno', 'mail', 'telefono']
	},
	'PUT /users/udateById/:id':{
		controller: 'mysqlController/userController',
		action: 'updateById',
        auth: false
	},
	'DELETE /users/deleteById/:id':{
		controller: 'mysqlController/userController',
		action: 'deleteById',
        auth: false
	},
	'GET /users/getUserRelacion/:id_usuario/:id_sistema':{
		controller: 'mysqlController/userController',
		action: 'getUserRelacion',
        auth: false
	},
	'GET /medicos/':{
		controller: 'mysqlController/medicoController',
		action: 'getAll',
        auth: false
	},
	'GET /medicos/:id':{
		controller: 'mysqlController/medicoController',
		action: 'getId',
        auth: true
	},
    'POST /medicos/create/':{
		controller: 'mysqlController/medicoController',
		action: 'create',
        auth: false,
		dataRequired: ['rut', 'nombres', 'apellidos']
	},
    'PUT /medicos/updateById/:id':{
		controller: 'mysqlController/medicoController',
		action: 'updateById',
        auth: true,
		dataRequired: ['id']
	},
    'DELETE /medicos/deleteById/:id':{
		controller: 'mysqlController/medicoController',
		action: 'deleteById',
        auth: true
	}
}