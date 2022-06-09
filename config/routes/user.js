'use strict';
/* jshint strict: false, esversion: 6 */

module.exports = {
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
	}
}