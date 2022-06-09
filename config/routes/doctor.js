'use strict';
/* jshint strict: false, esversion: 6 */

module.exports = {
	'GET /doctors/':{
		controller: 'mysqlController/doctorsController',
		action: 'getAll',
        auth: false
	},
	'GET /doctors/:id':{
		controller: 'mysqlController/doctorsController',
		action: 'getById',
        auth: true
	},
	'GET /doctors/getRelationSpecialities/:id_medico':{
		controller: 'mysqlController/doctorsController',
		action: 'getRelationSpecialities',
        auth: false,		
	},
    'POST /doctors/create/':{
		controller: 'mysqlController/doctorsController',
		action: 'create',
        auth: false,
		dataRequired: ['rut', 'nombres', 'apellidos']
	},
    'PUT /doctors/updateById/:id':{
		controller: 'mysqlController/doctorsController',
		action: 'updateById',
        auth: true,
		dataRequired: ['id']
	},
    'DELETE /doctors/deleteById/:id':{
		controller: 'mysqlController/doctorsController',
		action: 'deleteById',
        auth: true
	}
}