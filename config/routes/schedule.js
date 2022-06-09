'use strict'

module.exports = {
    'GET /schedules/':{
		controller: 'mysqlController/scheludesController',
		action: 'getAll',
        auth: false
	},
	'GET /schedules/:id':{
		controller: 'mysqlController/scheludesController',
		action: 'getById',
        auth: true
	},
    'POST /schedules/create/':{
		controller: 'mysqlController/scheludesController',
		action: 'create',
        auth: true,
		dataRequired: ['id_medico', 'fecha_atencion', 'hora_inicio', 'hora_termino']
	},
    'PUT /schedules/updateById/:id':{
		controller: 'mysqlController/scheludesController',
		action: 'updateById',
        auth: true,
		dataRequired: ['id_medico', 'fecha_atencion', 'hora_inicio', 'hora_termino']
	},
    'DELETE /schedules/deleteById/:id':{
		controller: 'mysqlController/scheludesController',
		action: 'deleteById',
        auth: true
	}
}